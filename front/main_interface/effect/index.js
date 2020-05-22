const Init = require('./init')
const Vis = require('./vis')
const Common = require('../../common/effect')
const FlatUnique = require('fantastic-utils/flatunique')
const OpenTabs = require('./opentabs')
const LoadNodeResults = require('../../common/effect/loadnoderesults')
const LoadHistory = require('./loadhistory')
const GenerateQuery = require('../../common/effect/generatequery')
const SearchQuery = require('./searchquery')
const RefreshResult = require('./refreshresult')

const effect = (state, action, send) => {
  Common(state, action, send)
  if (action.type == 'init') Init(send)
  if (action.type == 'nodes') {
    send({type: 'clear_selection'})
    send({type: 'loading', value: false})
    LoadNodeResults(state.nodes, send)
    LoadHistory(send)
    Vis(state, send)
  }
  if (action.type == 'graph_container') {
    action.container.onmouseleave = e => send({type: 'hover_ui', value: true})
    action.container.onmouseenter = e => send({type: 'hover_ui', value: false})
  }
  if (action.type == 'search' || action.type == 'graph_container') {
    send({type: 'loading', value: true})
    send({type: 'clear_selection'})
    fetch(`/nodes?${GenerateQuery(SearchQuery(state))}`)
    .then(res => res.json())
    .then(res => send({type: 'nodes', nodes: res}))
  }
  if (action.type == 'enable_command') fetch(`/commands?${GenerateQuery({[action.command]: action.enabled})}`, {method: 'POST'})
    .then(() => fetch('/commands'))    
    .then(res => res.json())
    .then(res => send({type: 'commands', commands: res}))

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
  if (action.type == 'run_quest') fetch(`/quests?${GenerateQuery({...SearchQuery(state), quest: action.quest})}`, {method: 'POST'})
    .then(res => res.json())
    .then(res => send({...action, type: 'quest_results', results: res.result, date: res.date, select: true}))
  if (action.type == 'quest_results') RefreshResult(state, action, send, state.quests[action.quest])
  if (action.type == 'test_results') RefreshResult(state, action, send, state.tests[action.test])
  if (action.type == 'run_test') fetch(`/tests?${GenerateQuery({...SearchQuery(state), test: action.test})}`, {method: 'POST', body: JSON.stringify(action.parameters)})
    .then(res => res.json())
    .then(res => send({...action, type: 'test_results', results: res.result, date: res.date, select: true, parameters: action.parameters}))
}

module.exports = effect