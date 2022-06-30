import Common from '@infosecinnovations/fantastic-front/effect'
import FlexSearch from '@infosecinnovations/fantastic-front/effect/flexsearch'
const FlatUnique = require('@infosecinnovations/fantastic-utils/flatunique')
import GenerateQuery from '@infosecinnovations/fantastic-front/effect/generatequery'
import Init from './init'
import OpenTabs from './opentabs'
import RefreshNodes from './refreshnodes'
import Nodes from './nodes'
import UserHistory from './userhistory'
import NodesFromEdge from '../util/nodesfromedge'
import JsPlumb from './jsplumb'
import ResizeStory from './resizestory'
import StoryNode from './storynode'
import Quest from './quest'
import Scan from './scan'
import UpdateInventory from '@infosecinnovations/fantastic-front/effect/updateinventory'
import UpdateInventoryRules from './updateinventoryrules'

const child_actions = [
  'action_result',
  'action_followup_result',
  'toggle favorite'
]

export default (state, action, send) => {
  Common(state, action, send)
  FlexSearch(state, action, send)
  if (action.type == 'init') Init(state, send)
  if (action.type == 'nodes') Nodes(state, send)
  if (action.type == 'story_container') JsPlumb(state, action, send)
  if (action.type == 'get_nodes') RefreshNodes(state, send, {nodes: action.nodes, date: action.date, max_date: action.max_date})
  if (action.type == 'graph_container') {
    action.container.onmouseleave = e => send({type: 'hover_ui', value: true})
    action.container.onmouseenter = e => send({type: 'hover_ui', value: false})
  }
  if (action.type == 'search' || action.type == 'init_complete') RefreshNodes(state, send, {...state.search, date: Date.now() - state.search.date * 1000 * 60})
  if (action.type == 'save_search') fetch(`/save_search?${GenerateQuery(state.search)}`, {method: 'POST'})
  .then(res => res.json())
  .then(res => {
    send({type: 'save_search_dialog', state: 'disabled'})
    UserHistory(send)
  })
  if (action.type == 'find_connections') {
    const node = state.selected.edge ? NodesFromEdge(state, state.selected.edge).from : state.nodes[state.selected.node]
    const connection = node.connections.find(v => v.connection_id == state.connection_search.expanded_connection)
    RefreshNodes(state, send, {
      ...state.search,
      date: Date.now() - state.search.date * 1000 * 60,
      connection_local_ip: state.connection_search.local_ip ? connection.local_address : undefined,
      connection_remote_ip: state.connection_search.remote_ip ? connection.remote_address : undefined,
      connection_process: state.connection_search.process ? connection.process.id : undefined
    })
  }
  if (action.type == 'enable_command') fetch(`/commands?${GenerateQuery({[action.command]: action.enabled})}`, {method: 'POST'})
    .then(() => fetch('/commands'))    
    .then(res => res.json())
    .then(res => {
      send({type: 'commands', commands: res})
      send({type: 'command_loaded', command: action.command})
      UserHistory(send)
    })

  if (action.type == 'vis_select') state.vis.selectNodes(action.node !== undefined ? [action.node] : action.nodes)
  if (action.type == 'open_viewer') OpenTabs(state, action, send)
  if (action.type == 'click') {
    const valid = typeof action.node != 'undefined'
    if (valid) {
      if (state.keys.shift) {
        const nodes = FlatUnique([state.selected.nodes, state.selected.node, action.node])
        send({type: 'select', nodes})
        send({type: 'vis_select', nodes})
      }
      else send({type: 'select', node: action.node})
    }
    else send({...action, type: 'select'})
  }
  if (action.type == 'run_quest') fetch(`/quests?${GenerateQuery({quest: action.quest})}`, {method: 'POST'})
    .then(res => res.json())
    .then(res => Quest(state, send, action.quest, res))
  if (action.type == 'quest_results'){
    if (action.select) send({type: 'nodes', nodes: action.nodes || []})
    send({type: 'quest_nodes', quest: action.quest, nodes: action.nodes ? action.nodes.map(v => v.node_id) : []})
  }
  if (action.type == 'run_scan') fetch(`/scans?${GenerateQuery({nodes: state.nodes.map(v => v.node_id), scan: action.scan, age: state.current_selection.date * 60 * 1000})}`, {method: 'POST', body: JSON.stringify(action.parameters)})
    .then(res => res.json())
    .then(res => Scan(state, send, action.scan, action.parameters, res))
  if (action.type == 'save') fetch(`/save?${GenerateQuery({history_id: action.history_id, remove: action.remove})}`, {method: 'POST'})
    .then(res => res.json())
    .then(res => {
      send({type: 'user_history', history: res})
      send({type: 'save_result', history_id: action.history_id})
    })
  if (action.type == 'order_saved') fetch(`/swap_saved?${GenerateQuery({a: action.a, b: action.b})}`, {method: 'POST'})
    .then(res => res.json())
    .then(res => {
      send({type: 'user_history', history: res})
      send({type: 'saved_ordered'})
    })
  if (action.type == 'post_review') fetch(`/review?${GenerateQuery({approved: action.approved, data_key: action.data_key, type: action.data_type, story_node: action.story_node})}`, {method: 'POST'})
    .then(res => res.json())
    .then(res => {
      send({...action, type: 'review_approval', approved: res.approved, date: res.date})
      send({type: 'review', results: undefined})
    })
  if (action.type == 'select_story') {
    if (action.story) {
      const storyData = state.stories[action.story]
      Object.entries(storyData.nodeData).forEach(
        node => node[1].targets.forEach(
          target => state.story.jsplumb.connect({source: node[0], target})
        )
      )
      ResizeStory(state, send)
    }
  }
  if (action.type == 'run_story_node') fetch(`/story_node?${GenerateQuery({story: action.story, node: action.node})}`, {method: 'POST'})
    .then(res => res.json())
    .then(res => StoryNode(state, send, action.story, action.node, res))
  if (action.type == 'story_results'){
    if (action.select) send({type: 'nodes', nodes: action.nodes || []})
    send({type: 'story_nodes', story: action.story, node: action.node, nodes: action.nodes ? action.nodes.map(v => v.node_id) : []})
  }
  if (action.type == 'scan_resolve') {
    if (action.scan) send({type: 'tab', tab: 'issues'})
  }
  if (action.type == 'select'){
    if (state.scan_resolve) {
      send({type: 'scan_resolve', scan: null})
      send({type: 'tab', tab: 'info'})
    }
  } 
  if (action.type == 'run_scan_resolve') fetch(`/scan_resolve?${GenerateQuery({scan_id: action.scan_id})}`, {method: 'POST'})
    .then(res => res.json())
    .then(res => {
      if (res.data_type == 'quests') Quest(state, send, res.data_key, res)
      else if (res.data_type == 'stories') StoryNode(state, send, res.data_key, res.story_node, res)
      else Scan(state, send, res.data_key, JSON.parse(res.parameters), res)
      send({type: 'scan_resolve', scan: null})
      send({type: 'tab', tab: 'info'})
    })
  if (action.type == 'save_current_inventory_rule') fetch(`/inventory_rules?${GenerateQuery({
    mode: state.view_inventory.current_rule.mode, 
    category: state.view_inventory.category
  })}`, {
    method: 'POST', 
    body: JSON.stringify(state.view_inventory.current_rule.mode == 'block' ? state.view_inventory.current_rule.data : state.view_inventory.item) // an allow rule just matches the full item
  })
  .then(res => res.json())
  .then(res => {
    UpdateInventoryRules(state, send, res)
    send({type: 'saving_inventory_rule_done'})
    send({type: 'inventory_panel_mode', mode: 'view'})
    send({type: 'reset_current_inventory_rule'})
  }) 
  if (action.type == 'delete_inventory_rule') {
    fetch(`/inventory_rules?${GenerateQuery({rule_id: action.rule_id})}`, {method: 'DELETE'})
    .then(res => res.json())
    .then(res => UpdateInventoryRules(state, send, res))
    .catch(rej => {})
  }
  if (child_actions.includes(action.type) && !action.from_other) state.child_tabs.forEach(v => v.send(action))
}