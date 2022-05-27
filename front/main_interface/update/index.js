import Common from '@infosecinnovations/fantastic-front/update'
import FlexSearch from '@infosecinnovations/fantastic-front/update/flexsearch'
import Hovered from '../defaults/hovered'
import QuestResults from './questresults'
import StoryResults from './storyresults'
import ScanResults from './scanresults'
import LoadSearch from './loadsearch'
const Clone = require('@infosecinnovations/fantastic-utils/clone')
const CompareEvent = require('@infosecinnovations/fantastic-utils/compareevent')

export default (state, action) => {
  if (action.type == 'init_complete') state.initialized = true
  if (action.type == 'nodes') state.nodes = action.nodes
  if (action.type == 'graph_container') state.graph_container = action.container
  if (action.type == 'select') {
    state.selected.nodes = action.nodes
    state.selected.node = action.node
    state.selected.edge = action.edge
    state.selected.connection = undefined
    state.connection_search.expanded_connection = undefined
  }
  if (action.type == 'date') state.search.date = action.date
  if (action.type == 'connection_limit') state.search.connection_limit = action.limit
  if (action.type == 'connection_type') state.search.connection_type = action.connection_type
  if (action.type == 'connection_state') {
    if (action.value && !state.search.connection_state.includes(action.state)) state.search.connection_state.push(action.state)
    if (!action.value) {
      const index = state.search.connection_state.findIndex(v => v === action.state)
      if (index > -1) state.search.connection_state.splice(index, 1)
    }
  }
  if (action.type == 'connection_foldout') state.search.connection_foldout = action.value
  if (action.type == 'show_external') state.search.show_external = action.value
  if (action.type == 'hover_node') {
    if (!state.hovered.nodes.find(v => v === action.node)) state.hovered.nodes.push(action.node)
  }
  if (action.type == 'unhover_node') state.hovered.nodes.splice(state.hovered.nodes.findIndex(v => v ===action.node), 1)
  if (action.type == 'hover_edge') {
    if (!state.hovered.edges.find(v => v === action.edge)) state.hovered.edges.push(action.edge)
  }
  if (action.type == 'unhover_edge') state.hovered.edges.splice(state.hovered.edges.findIndex(v => v ===action.edge), 1)
  if (action.type == 'clear_selection') {
    state.selected = {}
    state.hovered = Hovered()
    state.search.connection_foldout = false
  }
  if (action.type == 'hover_ui') state.hovered.ui = action.value
  if (action.type == 'loading') state.loading = action.value
  if (action.type == 'vis') state.vis = action.vis
  if (action.type == 'enable_command') state.command_status[action.command] = 'loading'
  if (action.type == 'command_loaded') state.command_status[action.command] = 'loaded'
  if (action.type == 'tab') state.tab = action.tab
  if (action.type == 'left_panel_state') state.left_panel_state = action.state
  if (action.type == 'key') state.keys[action.key] = action.value
  if (action.type == 'add_child_tab') state.child_tabs.push(action.tab)
  if (action.type == 'remove_child_tab') state.child_tabs.splice(state.child_tabs.findIndex(v => v === action.tab), 1)
  if (action.type == 'quest_results') QuestResults(state, action)
  if (action.type == 'quest_nodes') state.quest_results.nodes[action.quest] = action.nodes
  if (action.type == 'run_quest') {
    state.quest_results.status[action.quest] = 'loading'
    state.scan_results.status[action.quest] = 'loading'
  } 
  if (action.type == 'scan_results') ScanResults(state, action)
  if (action.type == 'run_scan') state.scan_results.status[action.scan] = 'loading' 
  if (action.type == 'scan_parameter') {
    if (!state.scan_parameters[action.scan]) state.scan_parameters[action.scan] = {}
    state.scan_parameters[action.scan][action.key] = action.value
  }
  if (action.type == 'user') state.user = action.user
  if (action.type == 'user_history') state.history = {...action.history, waiting: state.history ? state.history.waiting : []}
  if (action.type == 'save') state.history.waiting.push(action.history_id)
  if (action.type == 'save_result') {
    const history_item = state.history.saved.find(v => v.history_id == action.history_id) || state.history.results.find(v => v.history_id == action.history_id) // if we're removing an item from saved it might not be in the history anymore, so we need to check both arrays
    let event = -1
    do {
      event = state.history.waiting.findIndex(v => CompareEvent(state.stories, state.history.saved.find(h => h.history_id == v) || state.history.results.find(h => h.history_id == v), history_item)) // we should remove all matching elements because you can only save one identical one at a time
      if (event >= 0) state.history.waiting.splice(event, 1)
    } while(event >= 0 && history_item)
  }
  if (action.type == 'order_saved') state.history.ordering = true
  if (action.type == 'saved_ordered') state.history.ordering = false
  if (action.type == 'review') {
    if (!action.results) state.review = undefined
    else {
      state.review = {results: action.results, name: action.data_key, foldouts: {}, type: action.data_type, story_node: action.story_node, filter: action.results.some(v => v.filter) ? 'fail' : 'none'}
    }
  }
  if (action.type == 'review_foldout') {
    if (state.review) state.review.foldouts[action.node_id] = action.value
  }
  if (action.type == 'review_approval') {
    if (action.data_type == 'quests') {
      state.quest_results.approval[action.data_key] = action.approved
      if (action.approved && typeof action.date == 'number') state.quests[action.data_key].date_completed = action.date
    } 
    if (action.data_type == 'quests' || action.data_type == 'scans' || !action.data_type) state.scan_results.approval[action.data_key] = action.approved
    if (action.data_type == 'stories') {
      const approval_store = state.story_results.approval[action.data_key] || (state.story_results.approval[action.data_key] = {})
      approval_store[action.story_node] = action.approved
      state.scan_results.approval[state.stories[action.data_key].nodeData[action.story_node]] = action.approved
      if (action.approved) {
        const completed_store = state.story.completed[action.data_key] || (state.story.completed[action.data_key] = {})
        completed_store[action.story_node] = true // if we approved the result of a story node, we also completed it
      }
    }
  }
  if (action.type == 'post_review') state.review.loading = true
  if (action.type == 'review_filter') state.review.filter = action.mode
  if (action.type == 'connection') state.selected.connection = action.connection
  if (action.type == 'expand_connection') state.connection_search.expanded_connection = action.connection
  if (action.type == 'connection_search') state.connection_search[action.key] = action.value
  if (action.type == 'jsplumb') state.story.jsplumb = action.instance
  if (action.type == 'select_story') state.story.selected = action.story
  if (action.type == 'select_story_node') state.story.selected_node = action.node
  if (action.type == 'story_container') state.story.container = action.elm
  if (action.type == 'story_container_scale') state.story.scale = action.scale
  if (action.type == 'completed_story_node') {
    const story = state.story.completed[action.story] || (state.story.completed[action.story] = {})
    story[action.node] = true
  }
  if (action.type == 'run_story_node') {
    const node = state.stories[action.story].nodeData[action.node]
    if (node.type == 'scans') state.scan_results.status[node.data_key] = 'loading'
    const status_store = state.story_results.status[action.story] || (state.story_results.status[action.story] = {})
    status_store[action.node] = 'loading'
  }
  if (action.type == 'story_results') StoryResults(state, action)
  if (action.type == 'story_nodes') {
    const node_store = state.story_results.nodes[action.story] || (state.story_results.nodes[action.story] = {})
    node_store[action.node] = action.nodes
  }
  if (action.type == 'scan_resolve') {
    if (!action.scan) state.scan_resolve = null
    else {
      state.scan_resolve = {
        scan: action.scan,
        scan_id: action.scan_id
      }
    }
  } 
  if (action.type == 'run_scan_resolve') state.scan_results.status[action.scan] = 'loading'
  if (action.type == 'quest_complete') state.quests[action.quest].date_completed = action.date
  if (action.type == 'select_item') {
    state.selected_item = action.item
    if (action.item) {
      if (action.panel == 'actions') state.tab = 'actions'
      else state.left_panel_state = action.panel
    } 
  }
  if (action.type == 'save_search') state.save_search_dialog = 'waiting'
  if (action.type == 'load_search') LoadSearch(state, action)
  if (action.type == 'save_search_dialog') state.save_search_dialog = action.state
  if (action.type == 'search_label') state.search.label = action.label
  if (action.type == 'config') state.config = action.config
  if (action.type == 'node_warning') state.node_warning = action.nodes
  if (action.type == 'search' || action.type == 'init_complete') state.current_selection = Clone(state.search)
  if (action.type == 'foldout_checkbox') state.foldout_checkboxes[action.id] = action.value
  if (action.type == 'view_inventory') state.view_inventory = action.category
  state = Common(state, action)
  state = FlexSearch(state, action)
  return state
}