import Inputs from '../elements/inputs'
import WizardView from './wizardview'

export default (state, send) => WizardView(
  state, 
  send, 
  'Configure User Inputs', 
  "Here you can add input parameters. The user will be prompted to provide values for these when they run the action, which will be mapped to variable names in the PowerShell command. Use this feature wisely! Just leave this section empty if you don't need user inputs.",
  Inputs(state, send, state.action.wizard.funcName)
)