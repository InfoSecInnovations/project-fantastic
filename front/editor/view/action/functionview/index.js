import {h} from 'snabbdom/h'
import Result from './result'

const inputTypes = [
  "string",
  "number",
  "password"
]

export default (state, send, funcName) => {
  const data = state.action.json.functions[funcName]
  return h('div.column', [
    ...(funcName == 'run' ? [h('h3', 'Run (entry point)')] :
    [
      h('h3', data.name || funcName),
      h('div.row', [
        h('div.column', [
          h('label.label', {attrs: {for: `${state.action.filename}-${funcName}-name-editor`}}, 'Name'),
          h('input', {
            attrs: {
              value: funcName,
              id: `${state.action.filename}-${funcName}-name-editor`
            },
            on: {input: e => send({type: 'action_function_rename', name: e.target.value, function: funcName})}
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
        on: {input: e => send({type: 'action_function_command', name: e.target.value, function: funcName})}
      }, data.command || '')
    ]),
    h('div.row top-aligned', [
      h('label.label', {attrs: {for: `${state.action.filename}-${funcName}-command-method`}}, 'Command invocation method'),
      h('select', {attrs: {id: `${state.action.filename}-${funcName}-command-method`}}, [
        h('option', {attrs: {value: 'invoke', selected: data.method == 'invoke'}}, 'Invoke-Command ScriptBlock'),
        h('option', {attrs: {value: 'cimsession', selected: data.method == 'cimsession'}}, 'CimSession'),
      ]),
      h('div.label', 'This option determines how the command is run on each host. Some PowerShell commands will work with a CimSession allowing easy access to that host, for other commands you\'ll need to invoke a script block on the remote machine. To do so, just choose the relevant option above, Fantastic will take care of the rest!')
    ]),
    h('div.dividers', [
      h('div.row top-aligned', [
        h('h4', 'Input'),
        h('div.mini-button', {
          attrs: {title: 'Add input parameter'}
        }, '+')
      ]),
      ...(data.inputs ? data.inputs.map((input, i) => h('div.row top-aligned', [
        h('label.label', {attrs: {for: `${state.action.filename}-${funcName}-input-${i}-variable`}}, 'Variable name'),
        h('input', {attrs: {id: `${state.action.filename}-${funcName}-input-${i}-variable`, value: input.variable}}),
        h('label.label', {attrs: {for: `${state.action.filename}-${funcName}-input-${i}-name`}}, 'Display name'),
        h('input', {attrs: {id: `${state.action.filename}-${funcName}-input-${i}-name`, value: input.name}}),
        h('label.label', {attrs: {for: `${state.action.filename}-${funcName}-input-${i}-type`}}, 'Input type'),
        h('select', inputTypes.map(t => h('option', {attrs: {value: t, selected: input.type == t}}, t))),
        h('div.mini-button', {
          attrs: {title: 'Remove input parameter'}
        }, 'X')
      ])) : [])
    ]),
    ...(data.result ? [
      h('div.button', {}, 'Disable result processing'),
      h('div.row', [
        h('input', {
          attrs: {type: 'checkbox', id: `${state.action.filename}-${funcName}-convert-to-json`}, 
          props: {checked: data.json},
          on: {
            input: e => send({type: 'action_function_convert_to_json', value: e.target.checked})
          }
        }),
        h('label', {for: `${state.action.filename}-${funcName}-convert-to-json`}, 'Convert output to JSON')
      ]),
      h('div.row top-aligned', [
        h('label.label', {attrs: {for: `${state.action.filename}-${funcName}-result-format`}}, 'Result Format'),
        h('select', {
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
        data.result.array ? h('div.mini-button', {
          attrs: {title: 'Add result entry'}
        }, '+') : undefined
      ]),
      ...(data.result.array ? 
        [h('div.dividers no-title', data.result.array.map((d, i) => h('div.row top-aligned', [
          h('div.column', Result(state, send, funcName, d, i)),
          h('div.mini-button', {
            attrs: {title: 'Remove result entry'}
          }, 'X')
        ])))] : 
        Result(state, send, funcName, data.result))
    ] : [h('div.button', {}, 'Enable result processing')])
  ])
} 