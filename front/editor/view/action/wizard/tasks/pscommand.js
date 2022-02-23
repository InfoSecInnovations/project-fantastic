import {h} from 'snabbdom/h'
import getfuncname from './getfuncname'
import WizardView from '../wizardview'
import Command from '../../elements/command'

export default (state, send) => WizardView(
  state, 
  send, 
  'Set PowerShell Command', 
  `Choose a PowerShell command for the ${getfuncname(state)} function. This will be run on the host(s) targeted by the action. If you use any variable names in the command, you will be able to assign these from user input or from previous functions if this isn't the entry point function.`,
  Command(state, send, undefined, state.action.wizard.funcName),
  undefined,
  [state.action.json.functions[state.action.wizard.funcName].command ? undefined : 'You must provide a command!']
)