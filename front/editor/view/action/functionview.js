import {h} from 'snabbdom/h'
import ResultDataView from './resultdataview'

export default (state, send, funcName) => {
  const data = state.action.json.functions[funcName]
  return h('div.column', [
    ...(funcName == 'run' ? [h('h3', 'Run (entry point)')] :
    [
      h('h3', data.name || funcName),
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
      h('div.column', [
        h('h4', 'Result label'),
        ...ResultDataView(
          state,
          send,
          funcName,
          data.result.label,
          `${state.action.filename}-${funcName}-label`,
          ['label']
        )
      ]),
      h('div.column', [
        h('div.item', [h('h4', 'Data'), h('div.mini-button', {}, '+')]),
        ...(data.result.data ? data.result.data.map((d, i) => h('div.item', [
          h('div', ResultDataView(
            state,
            send,
            funcName,
            d,
            `${state.action.filename}-${funcName}-data-${i}-label`,
            ['data', i]
          )),
          h('div.mini-button', {}, 'X')
        ])) : [])
      ]),
      h('div.column', [
        h('div.item', [h('h4', 'Followup Actions'), h('div.mini-button', {}, '+')]),
        ...(data.result.followups ? data.result.followups.map((f, i) => h('div.item', [
          h('div.row', [
            h('label.label', {attrs: {for: `${state.action.filename}-${funcName}-followups-${i}-function`}}, 'Function'),
            h('select', {attrs: {id: `${state.action.filename}-${funcName}-followups-${i}-function`}}, Object.keys(state.action.json.functions)
              .filter(func => func !== funcName && func !== 'run')
              .map(func => h('option', {attrs: {value: func, selected: func == f.function}}, func))
            ),
          ]),
          // TODO: result data view for optional enabled field
          // TODO: map data object to result view fields
          h('div.mini-button', {}, 'X')
        ])) : [])
      ])
    ] : [h('div.button', {}, 'Enable result processing')])
  ])
} 