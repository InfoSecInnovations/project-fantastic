import Command from '../../elements/command'

export default {
  title: 'Set PowerShell Command',
  description: "Choose a PowerShell command for this function. This will be run on the host(s) targeted by the action. If you use any variable names in the command, you will be able to assign these from user input or from previous functions if this isn't the entry point function.",
  view: (state, send) => Command(state, send, undefined, state.action.wizard.funcName),
  errors: state => [state.action.json.functions[state.action.wizard.funcName].command ? undefined : 'You must provide a command!'],
  scope: 'function'
}