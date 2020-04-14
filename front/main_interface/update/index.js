const Common = require('../../common/update')
const Hovered = require('../defaults/hovered')
const QuestResults = require('./questresults')

const update = (state, action) => {
  if (action.type == 'nodes') state.nodes = action.nodes
  if (action.type == 'graph_container') state.graph_container = action.container
  if (action.type == 'select') {
    state.selected.nodes = action.nodes
    state.selected.node = action.node
    state.selected.edge = action.edge
  }
  if (action.type == 'date') state.search.date = action.date
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
  if (action.type == 'commands') state.commands = action.commands
  if (action.type == 'enable_command') state.commands[action.command].enabled = action.enabled
  if (action.type == 'quests') state.quests = action.quests
  if (action.type == 'tab') state.tab = action.tab
  if (action.type == 'left_panel_state') state.left_panel_state = action.state
  if (action.type == 'key') state.keys[action.key] = action.value
  if (action.type == 'add_child_tab') state.child_tabs.push(action.tab)
  if (action.type == 'remove_child_tab') state.child_tabs.splice(state.child_tabs.findIndex(v => v === action.tab), 1)
  if (action.type == 'quest_results') QuestResults(state, action)
  if (action.type == 'run_quest') state.quest_results.status[action.quest] = 'loading'
  state = Common(state, action)
  return state
}

module.exports = update