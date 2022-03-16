import {h} from 'snabbdom/h'
import Info from '../common/info'
import ActionTarget from './elements/actiontarget'
import FunctionView from './functionview'

export default (state, send) => h('div#action-editor.panel editor-scroll', [
  h('div.column', [
    ...Info(state, send, 'action'),
    ActionTarget(state, send)
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