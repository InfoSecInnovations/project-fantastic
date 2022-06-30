import {h} from 'snabbdom/h'

export default {
  title: 'Convert To JSON',
  description: "Select whether you want to run the command through the ConvertTo-JSON cmdlet or not. In most cases this is recommended as working with JSON in Fantastic is much easier.",
  view: (state, send) => h('div.row', [
    h('input', {
      attrs: {type: 'checkbox', id: `${state.action.filename}-${state.action.wizard.funcName}-convert-to-json`}, 
      props: {checked: state.action.json.functions[state.action.wizard.funcName].json},
      on: {
        input: e => send({type: 'action_function_convert_to_json', value: e.target.checked, function: state.action.wizard.funcName})
      }
    }),
    h('label', {for: `${state.action.filename}-${state.action.wizard.funcName}-convert-to-json`}, 'Convert output to JSON')
  ]),
  scope: 'function'
} 