const Vis = require('./vis')
const ActionFollowup = require('./actionfollowup')

const effect = (state, action, send) => {
  if (action.type == 'init') {
    window.onresize = e => send({type: 'render'})
    fetch('/commands')
      .then(res => res.json())
      .then(res => send({type: 'commands', commands: res}))
    fetch('/actions')
      .then(res => res.json())
      .then(res => send({type: 'actions', actions: res}))
  }
  if (action.type == 'nodes') {
    send({type: 'clear_selection'})
    send({type: 'loading', value: false})
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
  if (action.type == 'perform_action') fetch(`/actions?action=${action.action}&node_id=${action.node_id}`, {method: 'POST'})
    .then(res => res.json())
    .then(res => send({type: 'action_result', result: res, action: action.action, hostname: action.host}))
  if (action.type == 'action_followup') ActionFollowup(state, action, send)
  if (action.type == 'vis_select') state.vis.selectNodes([action.node])
}

module.exports = effect