import WizardView from '../wizardview'
import ActionTarget from '../../elements/actiontarget'

export default (state, send) => WizardView(
  state, 
  send, 
  'Set Target Type', 
  "Actions can target hosts on the network, or specific connections belonging to a host.",
  ActionTarget(state, send)
)