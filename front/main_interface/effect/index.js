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

  if (action.type == 'vis_select') state.vis.selectNodes(action.node ? [action.node] : action.nodes)
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
}

module.exports = effect