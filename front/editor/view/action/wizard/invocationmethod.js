import {h} from 'snabbdom/h'
import WizardView from './wizardview'

export default (state, send) => {
  const data = state.action.json.functions[state.action.wizard.funcName]
  return WizardView(
    state, 
    send, 
    'Select Invocation Method', 
    "Choose the invocation method for the command, this determines how the it is run on each host. Some PowerShell commands will work with a CimSession allowing easy access to that host (check the Microsoft documentation to see if your command supports this parameter), for other commands you\'ll need to invoke a script block on the remote machine. To do so, just choose the relevant option above, Fantastic will take care of the rest!",
    h('select', {
      on: {input: e => send({type: 'action_function_command_method', function: state.action.wizard.funcName, method: e.target.value})}
    }, [
      h('option', {attrs: {value: 'invoke', selected: data.method == 'invoke'}}, 'Invoke-Command ScriptBlock'),
      h('option', {attrs: {value: 'cimsession', selected: data.method == 'cimsession'}}, 'CimSession'),
    ])
  )
} 