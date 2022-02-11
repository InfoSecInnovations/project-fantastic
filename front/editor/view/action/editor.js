import {h} from 'snabbdom/h'
import Info from '../common/info'
import FunctionView from './functionview'

const targetHelp = {
  host: "This action is intended to act upon machines in the network.",
  connection: "This action is intended to specifically target a network connection from the host. It provides a set of variables that can be used in the PowerShell command to access the connection details."
}

export default (state, send) => h('div#action-editor.panel', [
  h('div.column', [
    ...Info(
      state,
      send,
      'action',
      state.action.json.name,
      'set_action_name',
      state.action.json.description,
      'set_action_description',
      state.action.json.hosts,
      'enable_action_host',
      state.action.json.role,
      'set_action_role'
    ),
    h('div.column', [
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
  ]),
  h('div.column', [
    FunctionView(state, send, 'run'),
    ...Object.keys(state.action.json.functions).filter(key => key != 'run').map(key => FunctionView(state, send, key)),
    h('div.row', [
      h('div.button', {
        on: {click: e => send({type: 'add_action_followup'})}
      }, 'Add followup function'),
      h('div.label', 'Followup functions can be called from the entry point of from other followups using the data from the calling function.')
    ])
  ])
])