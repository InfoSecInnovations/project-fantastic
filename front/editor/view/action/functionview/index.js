import {h} from 'snabbdom/h'
import ResultDataView from '../resultdataview'
import Result from './result'

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
      h('input', {
        attrs: {
          value: data.command || '',
          id: `${state.action.filename}-${funcName}-command-editor`
        },
        on: {input: e => send({type: 'action_function_command', name: e.target.value, function: funcName})}
      })
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
      ...(data.result.array ? 
        [h('div.dividers no-title', data.result.array.map((d, i) => h('div.column', Result(state, send, funcName, d, i))))] : 
        Result(state, send, funcName, data.result))
    ] : [h('div.button', {}, 'Enable result processing')])
  ])
} 