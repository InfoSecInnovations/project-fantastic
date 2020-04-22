const Vis = require('./vis')
const Common = require('../../common/effect')
const FlatUnique = require('fantastic-utils/flatunique')
const OpenTabs = require('./opentabs')
const LoadNodeResults = require('../../common/effect/loadnoderesults')

const effect = (state, action, send) => {
  Common(state, action, send)
  if (action.type == 'init') {
    window.onresize = e => send({type: 'render'})
    fetch('/commands')
    .then(res => res.json())
    .then(res => send({type: 'commands', commands: res}))
    fetch('/quests')
    .then(res => res.json())
    .then(res => send({type: 'quests', quests: res}))
    window.onkeydown = e => {
      if (e.key === 'Shift') send({type: 'key', key: 'shift', value: true})
    }
    window.onkeyup = e => {
      if (e.key === 'Shift') send({type: 'key', key: 'shift', value: false})
    }
  }
  if (action.type == 'nodes') {
    send({type: 'clear_selection'})
    send({type: 'loading', value: false})
    action.nodes.forEach(n => LoadNodeResults(n, send))
    fetch('/quest_history')
    .then(res => res.json())
    .then(res => res.forEach(v => send({type: 'quest_results', quest: v.quest, date: v.date, results: JSON.parse(v.results), select: false})))
    Vis(state, send)
  }
  if (action.type == 'graph_container') {
    action.container.onmouseleave = e => send({type: 'hover_ui', value: true})
    action.container.onmouseenter = e => send({type: 'hover_ui', value: false})
  }
  if (action.type == 'search' || action.type == 'graph_container') {
    send({type: 'loading', value: true})
    send({type: 'clear_selection'})
    fetch(`/nodes?date=${!state.search.date ? 0 : Date.now() - state.search.date * 60 * 1000}&connection_type=${state.search.connection_type}&connection_state=${state.search.connection_state}&show_external=${state.search.show_external}`)
    .then(res => res.json())
    .then(res => send({type: 'nodes', nodes: res}))
  }
  if (action.type == 'enable_command') fetch(`/commands?${action.command}=${action.enabled}`, {method: 'POST'})
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
  if (action.type == 'run_quest') fetch(`/quests?date=${!state.search.date ? 0 : Date.now() - state.search.date * 60 * 1000}&quest=${action.quest}`, {method: 'POST'}) // TODO: pass all search parameters
    .then(res => res.json())
    .then(res => send({...action, type: 'quest_results', results: res.result, date: res.date, select: true}))
  if (action.type == 'quest_results') {
    const quest_data = state.quests[action.quest]
    const node_indices = action.results.map(v => state.nodes.findIndex(n => n.node_id == v.node_id)).filter(v => v !== -1)
    const highlight = node_indices.filter(v => action.results.find(r => r.node_id === state.nodes[v].node_id && r.result != quest_data.pass.condition))
    if (action.select) {
      send({type: 'select', nodes: highlight})
      send({type: 'vis_select', nodes: highlight})
      node_indices.forEach(v => LoadNodeResults(state.nodes[v], send))
    }
  }
}

module.exports = effect