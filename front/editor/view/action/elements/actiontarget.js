import {h} from 'snabbdom/h'
const targetHelp = {
  host: "This action is intended to act upon machines in the network.",
  connection: "This action is intended to specifically target a network connection from the host. It provides a set of variables that can be used in the PowerShell command to access the connection details."
}

export default (state, send) => h('div.column', [
  h('label.label', {attrs: {for: 'action-target-editor'}}, 'Target'),
  h('select', {
    attrs: {id: 'action-target-editor'},
    on: { input: e => send({type: 'set_action_target', target: e.target.value}) }
  }, [
    h('option', { attrs: { value: 'host', selected: state.action.json.target == 'host' || !state.action.json.target }}, 'host'),
    h('option', { attrs: { value: 'connection', selected: state.action.json.target == 'connection' }}, 'connection')
  ]),
  h('div.label', targetHelp[state.action.json.target || 'host'])
])