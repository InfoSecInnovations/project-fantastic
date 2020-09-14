import Common from '../../common/effect'
import FlexSearch from '../../common/effect/flexsearch'
const FlatUnique = require('fantastic-utils/flatunique')
import GenerateQuery from '../../common/effect/generatequery'
import Init from './init'
import OpenTabs from './opentabs'
import SearchQuery from './searchquery'
import RefreshNodes from './refreshnodes'
import Nodes from './nodes'
import UserHistory from './userhistory'

export default (state, action, send) => {
  Common(state, action, send)
  FlexSearch(state, action, send)
  if (action.type == 'init') Init(send)
  if (action.type == 'nodes') Nodes(state, send)
  if (action.type == 'get_nodes') RefreshNodes(send, {nodes: action.nodes, date: action.date, max_date: action.max_date})
  if (action.type == 'graph_container') {
    action.container.onmouseleave = e => send({type: 'hover_ui', value: true})
    action.container.onmouseenter = e => send({type: 'hover_ui', value: false})
  }
  if (action.type == 'search' || action.type == 'graph_container') RefreshNodes(send, SearchQuery(state))
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
  if (action.type == 'action_result' || action.type == 'action_followup_result') state.child_tabs.forEach(v => v.send(action))
  if (action.type == 'run_quest') fetch(`/quests?${GenerateQuery({quest: action.quest})}`, {method: 'POST'})
    .then(res => res.json())
    .then(res => {
      send({...action, type: 'quest_results', results: res.result, date: res.date, select: true, nodes: res.rows})
      send({...action, type: 'test_results', results: res.result, date: res.date, parameters: state.quests[action.quest].parameters, test: action.quest}) // quest results are the same as the test run by the quest
      UserHistory(send)
      if (state.quests[action.quest].pass === 'review') send({type: 'review', results: res.result.results, name: action.quest, quest: true})
    })
  if (action.type == 'quest_results'){
    if (action.select) send({type: 'nodes', nodes: action.nodes || []})
    send({type: 'quest_nodes', quest: action.quest, nodes: action.nodes ? action.nodes.map(v => v.node_id) : []})
  }
  if (action.type == 'run_test') fetch(`/tests?${GenerateQuery({nodes: state.nodes.map(v => v.node_id), test: action.test})}`, {method: 'POST', body: JSON.stringify(action.parameters)})
    .then(res => res.json())
    .then(res => {
      send({...action, type: 'test_results', results: res.result, date: res.date, select: true, parameters: action.parameters})
      UserHistory(send)
      if (state.tests[action.test].pass === 'review') send({type: 'review', results: res.result.results, name: action.test})
    })
  if (action.type == 'favorite') fetch(`/favorites?${GenerateQuery({history_id: action.history_id, remove: action.remove})}`, {method: 'POST'})
    .then(res => res.json())
    .then(res => {
      send({type: 'user_history', history: res})
      send({type: 'favorite_result', history_id: action.history_id})
    })
  if (action.type == 'order_favorites') fetch(`/swap_favorites?${GenerateQuery({a: action.a, b: action.b})}`, {method: 'POST'})
    .then(res => res.json())
    .then(res => {
      send({type: 'user_history', history: res})
      send({type: 'favorites_ordered'})
    })
  if (action.type == 'post_review') fetch(`/review?${GenerateQuery({approved: action.approved, test: action.test, quest: action.quest})}`, {method: 'POST'})
    .then(res => res.json())
    .then(res => {
      send({...action, type: 'review_approval', approved: res.approved})
      send({type: 'review', results: undefined})
    })
}