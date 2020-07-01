const Init = require('./init')
const Common = require('../../common/effect')
const FlatUnique = require('fantastic-utils/flatunique')
const OpenTabs = require('./opentabs')
const GenerateQuery = require('../../common/effect/generatequery')
const SearchQuery = require('./searchquery')
const RefreshNodes = require('./refreshnodes')
const Nodes = require('./nodes')
const UserHistory = require('./userhistory')

const effect = (state, action, send) => {
  Common(state, action, send)
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
    })
  if (action.type == 'quest_results'){
    if (action.nodes) {
      send({type: 'nodes', nodes: action.nodes})
      send({type: 'quest_nodes', quest: action.quest, nodes: action.nodes.map(v => v.node_id)})
    }
  }
  if (action.type == 'run_test') fetch(`/tests?${GenerateQuery({nodes: state.nodes.map(v => v.node_id), test: action.test})}`, {method: 'POST', body: JSON.stringify(action.parameters)})
    .then(res => res.json())
    .then(res => {
      send({...action, type: 'test_results', results: res.result, date: res.date, select: true, parameters: action.parameters})
      UserHistory(send)
    })
}

module.exports = effect