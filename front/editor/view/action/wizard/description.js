import {h} from 'snabbdom/h'
import WizardView from './wizardview'

export default (state, send) => WizardView(
  state, 
  send, 
  'Set Description', 
  "It's a good idea to explain in a couple of sentences what exactly this action does, and why the user might want to run it.",
  h('input', {
    props: {value: state.action.json.description || ''},
    on: {input: e => send({type: 'set_action_description', description: e.target.value})}
  })
)