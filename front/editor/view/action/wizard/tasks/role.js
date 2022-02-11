import {h} from 'snabbdom/h'
import WizardView from '../wizardview'
import roles from '../../../common/roles'

export default (state, send) => WizardView(
  state, 
  send, 
  'Set Role', 
  "The minimum access role required to use this action. You should use the elevated role for anything that can interfere with the targeted host. This can be overridden by followup actions if necessary.",
  h('div.column', [
    h('label.label', {attrs: {for: `action-role-editor`}}, 'Role'),
    h('select', {
      attrs: {id: `action-role-editor`},
      on: { input: e => send({type: 'set_action_role', role: e.target.value}) }
    }, roles.map((role, i) => h('option', { attrs: { value: role, selected: state.action.json.role == role || (!state.action.json.role && i == 0) }}, role)))
  ])
)