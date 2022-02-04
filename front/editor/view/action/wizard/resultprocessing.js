import {h} from 'snabbdom/h'
import WizardView from './wizardview'

export default (state, send) => {
  const enabled = !!state.action.json.functions[state.action.wizard.funcName].result
  return WizardView(
    state, 
    send, 
    'Enable Result Processing', 
    "Choose whether you will do anything with the output of the PowerShell command or not. You can use this to display the results of the command to the user and run followup actions based on them.",
    h('div.button', {
      on: {click: e => send({type: 'action_function_result_processing', enabled, function: funcName})}
    }, enabled ? 'Disable result processing' : 'Enable result processing'),
    undefined,
    undefined,
    !enabled
  )
}