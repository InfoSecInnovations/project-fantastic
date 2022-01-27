import {h} from 'snabbdom/h'
import Info from '../common/info'
import FunctionView from './functionview'

export default (state, send) => h('div#action-editor panel', [
  h('div.column', Info(
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
  )),
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