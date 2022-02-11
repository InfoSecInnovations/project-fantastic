import {h} from 'snabbdom/h'
import WizardView from '../wizardview'

export default (state, send) => WizardView(
  state, 
  send, 
  'Set Display Name', 
  "This will be the name shown to the user in Fantastic, it's recommended to set this, otherwise the filename will be shown instead, which can be less descriptive.",
  h('input', {
    attrs: {value: state.action.json.name ||''},
    on: {input: e => send({type: 'set_action_name', name: e.target.value})}
  }),
  [state.action.json.name ? undefined : 'With no display name your action might be less readable to the user.']
)