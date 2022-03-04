import {h} from 'snabbdom/h'

export default {
  title: 'Enable Result Processing',
  description: "Choose whether you will do anything with the output of the PowerShell command or not. You can use this to display the results of the command to the user and run followup actions based on them.",
  view: (state, send) =>  {
    const enabled = !!state.action.json.functions[state.action.wizard.funcName].result
    return h('div.button', {
      on: {
        click: e => send({type: 'action_function_result_processing', enabled: !enabled, function: state.action.wizard.funcName})
      }
    }, enabled ? 'Disable result processing' : 'Enable result processing')
  },
  nextTasks: state => !!state.action.json.functions[state.action.wizard.funcName].result && ['convert_to_json', 'result_label', 'add_data_items']
}