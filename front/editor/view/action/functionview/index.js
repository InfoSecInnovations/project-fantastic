import {h} from 'snabbdom/h'
import Result from './result'

const inputTypes = [
  "string",
  "number",
  "password"
]

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
            attrs: {
              value: funcName,
              id: `${state.action.filename}-${funcName}-name-editor`
            },
            on: {input: e => send({type: 'rename_action_function', newName: e.target.value, function: funcName})}
          })
        ]),
        h('div.column', [
          h('label.label', {attrs: {for: `${state.action.filename}-${funcName}-display-name-editor`}}, 'Display Name'),
          h('input', {
            attrs: {
              value: data.name || '',
              id: `${state.action.filename}-${funcName}-display-name-editor`
            },
            on: {input: e => send({type: 'action_function_display_name', name: e.target.value, function: funcName})}
          })
        ])
      ])
    ]),
    h('div.column', [
      h('label.label', {attrs: {for: `${state.action.filename}-${funcName}-command-editor`}}, 'PowerShell Command'),
      h('textarea', {
        attrs: {
          rows: 1,
          id: `${state.action.filename}-${funcName}-command-editor`
        },
        on: {input: e => send({type: 'action_function_command', command: e.target.value, function: funcName})}
      }, data.command || '')
    ]),
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
    h('div.dividers', [
      h('div.row top-aligned', [
        h('h4', 'Input'),
        h('div.label', 'The input section allows you to prompt the user for values to be used by the command. Use this feature wisely!'),
        h('div.mini-button', {
          attrs: {title: 'Add input parameter'},
          on: {click: e => send({type: 'add_action_input', function: funcName})}
        }, '+')
      ]),
      ...(data.inputs ? data.inputs.map((input, i) => h('div.row top-aligned', [
        h('label.label', {attrs: {for: `${state.action.filename}-${funcName}-input-${i}-variable`}}, 'Variable name'),
        h('input', {
          attrs: {id: `${state.action.filename}-${funcName}-input-${i}-variable`, value: input.variable},
          on: {input: e => send({type: 'action_input_variable', function: funcName, index: i, value: e.target.value})}
        }),
        h('label.label', {attrs: {for: `${state.action.filename}-${funcName}-input-${i}-name`}}, 'Display name'),
        h('input', {
          attrs: {id: `${state.action.filename}-${funcName}-input-${i}-name`, value: input.name},
          on: {input: e => send({type: 'action_input_name', function: funcName, index: i, value: e.target.value})}
        }),
        h('label.label', {attrs: {for: `${state.action.filename}-${funcName}-input-${i}-type`}}, 'Input type'),
        h('select', {
          attrs: {id: `${state.action.filename}-${funcName}-input-${i}-type`},
          on: {input: e => send({type: 'action_input_type', function: funcName, index: i, value: e.target.value})}
        }, inputTypes.map(t => h('option', {attrs: {value: t, selected: input.type == t}}, t))),
        h('div.mini-button', {
          attrs: {title: 'Remove input parameter'},
          on: {click: e => send({type: 'remove_action_input', function: funcName, index: i})}
        }, 'X')
      ])) : [])
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
            input: e => send({type: 'action_function_convert_to_json', value: e.target.checked})
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
          h('div.column', Result(state, send, funcName, d, i)),
          h('div.mini-button', {
            on: {click: e => send({type: 'action_function_result_array_remove', function: funcName, index: i})},
            attrs: {title: 'Remove result entry'}
          }, 'X')
        ])))] : 
        Result(state, send, funcName, data.result))
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