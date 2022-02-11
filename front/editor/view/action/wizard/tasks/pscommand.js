import {h} from 'snabbdom/h'
import getfuncname from './getfuncname'
import WizardView from '../wizardview'

export default (state, send) => WizardView(
  state, 
  send, 
  'Set PowerShell Command', 
  `Choose a PowerShell command for the ${getfuncname(state)} function. This will be run on the host(s) targeted by the action. If you use any variable names in the command, you will be able to assign these from user input or from previous functions if this isn't the entry point function.`,
  h('textarea', {
    attrs: {
      rows: 1
    },
    on: {input: e => send({type: 'action_function_command', command: e.target.value, function: state.action.wizard.funcName})}
  }, state.action.json.functions[state.action.wizard.funcName].command || ''),
  undefined,
  [state.action.json.functions[state.action.wizard.funcName].command ? undefined : 'You must provide a command!']
)