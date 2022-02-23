import {h} from 'snabbdom/h'
import Command from '../elements/command'
import Inputs from '../elements/inputs'
import Result from './result'

const resultProcessingHelp = 'If result processing is enabled you can display data to the user gathered from the output of the function, and use that data to perform further actions. If it\'s disabled, the function will just act upon the targeted systems without processing the output of the command.' 

export default (state, send, funcName) => {
  const data = state.action.json.functions[funcName]
  return h('div.column', [
    ...(funcName == 'run' ? [h('h3', 'Run (entry point)')] :
    [
      h('div.row top-aligned', [
        h('h3', data.name || funcName),
        h('div.mini-button', {
          on: {click: e => send({type: 'delete_action_function', function: funcName})},
          attrs: {title: 'Delete function'}
        }, 'X')
      ]),
      h('div.row', [
        h('div.column', [
          h('label.label', {attrs: {for: `${state.action.filename}-${funcName}-name-editor`}}, 'Name'),
          h('input', {
            props: { value: funcName },
            attrs: {
              id: `${state.action.filename}-${funcName}-name-editor`
            },
            on: {input: e => send({type: 'rename_action_function', newName: e.target.value, function: funcName})}
          })
        ]),
        h('div.column', [
          h('label.label', {attrs: {for: `${state.action.filename}-${funcName}-display-name-editor`}}, 'Display Name'),
          h('input', {
            props: { value: data.name || '' },
            attrs: {
              id: `${state.action.filename}-${funcName}-display-name-editor`
            },
            on: {input: e => send({type: 'action_function_display_name', name: e.target.value, function: funcName})}
          })
        ])
      ])
    ]),
    Inputs(state, send, funcName, 'The input section allows you to prompt the user for values to be used by the command. Use this feature wisely!'),
    Command(state, send, 'PowerShell Command', funcName),
    h('div.row top-aligned', [
      h('label.label', {attrs: {for: `${state.action.filename}-${funcName}-command-method`}}, 'Command invocation method'),
      h('select', {
        attrs: {id: `${state.action.filename}-${funcName}-command-method`},
        on: {input: e => send({type: 'action_function_command_method', function: funcName, method: e.target.value})}
      }, [
        h('option', {attrs: {value: 'invoke', selected: data.method == 'invoke'}}, 'Invoke-Command ScriptBlock'),
        h('option', {attrs: {value: 'cimsession', selected: data.method == 'cimsession'}}, 'CimSession'),
      ]),
      h('div.label', 'This option determines how the command is run on each host. Some PowerShell commands will work with a CimSession allowing easy access to that host, for other commands you\'ll need to invoke a script block on the remote machine. To do so, just choose the relevant option above, Fantastic will take care of the rest!')
    ]),
    ...(data.result ? [
      h('div.row', [
        h('div.button', {
          on: {click: e => send({type: 'action_function_result_processing', enabled: false, function: funcName})}
        }, 'Disable result processing'),
        h('div.label', resultProcessingHelp)
      ]),
      h('div.row', [
        h('input', {
          attrs: {type: 'checkbox', id: `${state.action.filename}-${funcName}-convert-to-json`}, 
          props: {checked: data.json},
          on: {
            input: e => send({type: 'action_function_convert_to_json', value: e.target.checked, function: funcName})
          }
        }),
        h('label', {for: `${state.action.filename}-${funcName}-convert-to-json`}, 'Convert output to JSON'),
        h('div.label', 'Apply the ConvertTo-Json cmdlet to the command. In most cases this is recommended as working with JSON in Fantastic is much easier.')
      ]),
      h('div.row top-aligned', [
        h('label.label', {attrs: {for: `${state.action.filename}-${funcName}-result-format`}}, 'Result Format'),
        h('select', {
          on: {
            input: e => send({type: 'action_function_result_format', value: e.target.value, function: funcName})
          },
          attrs:{
            id: `${state.action.filename}-${funcName}-result-format`
          },
        }, [
          h('option', {
            attrs: {
              value: 'single',
              selected: !data.result.array
            }
          }, 'single'),
          h('option', {
            attrs: {
              value: 'array',
              selected: data.result.array
            }
          }, 'array')
        ]),
        h('div.label', data.result.array ? 'Create multiple entries for each item from the command output.' : 'Create one result entry per item from the command output.'),
        data.result.array ? h('div.mini-button', {
          attrs: {title: 'Add result entry'},
          on: {click: e => send({type: 'action_function_result_array_add', function: funcName})}
        }, '+') : undefined
      ]),
      ...(data.result.array ? 
        [h('div.dividers no-title', data.result.array.map((d, i) => h('div.row top-aligned', [
          h('div.column', Result(state, send, funcName, i)),
          h('div.mini-button', {
            on: {click: e => send({type: 'action_function_result_array_remove', function: funcName, index: i})},
            attrs: {title: 'Remove result entry'}
          }, 'X')
        ])))] : 
        Result(state, send, funcName))
    ] : [
      h('div.row', [
        h('div.button', {
          on: {click: e => send({type: 'action_function_result_processing', enabled: true, function: funcName})}
        }, 'Enable result processing'),
        h('div.label', resultProcessingHelp)
      ])
    ])
  ])
} 