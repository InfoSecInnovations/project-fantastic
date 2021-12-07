import {h} from 'snabbdom/h'
import ResultDataView from '../resultdataview'

export default (state, send, funcName, data, index) => {
  const baseID = typeof index != 'undefined' ? `${state.action.filename}-${funcName}-result-${index}` : `${state.action.filename}-${funcName}`
  return [
    h('div.column', [
      h('h4', 'Result label'),
      ...ResultDataView(
        state,
        send,
        funcName,
        data.label,
        `${baseID}-label`,
        [index, 'label']
      )
    ]),
    h('div.column', [
      h('div.item', [h('h4', 'Data'), h('div.mini-button', {}, '+')]),
      ...(data.data ? data.data.map((d, i) => h('div.row top-aligned', [
        h('div', ResultDataView(
          state,
          send,
          funcName,
          d,
          `${baseID}-data-${i}-label`,
          [index, 'data', i]
        )),
        h('div.mini-button', {}, 'X')
      ])) : [])
    ]),
    h('div.dividers', [
      Object.keys(state.action.json.functions).find(k => k != 'run') ? h('div.item', [h('h4', 'Followup Actions'), h('div.mini-button', {}, '+')]) : undefined,
      ...(data.followups ? data.followups.map((f, i) => h('div.column', [
        h('div.item', [
          h('div.row', [
            h('label', {attrs: {for: `${baseID}-followups-${i}-function`}}, 'Function'),
            h('select', {attrs: {id: `${baseID}-followups-${i}-function`}}, Object.keys(state.action.json.functions)
              .filter(func => func !== funcName && func !== 'run')
              .map(func => h('option', {attrs: {value: func, selected: func == f.function}}, func))
            )
          ]),
          h('div.mini-button', {attrs: {title: 'Remove followup'}}, 'X')
        ]),
        h('div.row top-aligned', [
          h('input', {
            attrs: {type: 'checkbox', id: `${baseID}-followups-${i}-enabled`}, 
            props: {checked: f.enabled},
            on: {
              input: e => send({type: 'action_followup_enabled_status', function: funcName, path: ['followups', i], value: e.target.checked})
            }
          }),
          h('label', {for: `${baseID}-followups-${i}-enabled`}, 'Enabled status'),
          f.enabled ? h('div.column', ResultDataView(
            state,
            send,
            funcName,
            f.enabled,
            `${baseID}-followups-${i}-enabled-data`,
            [index, 'followups', i]
          )) : undefined
        ]),
        h('div.dividers', [
          h('div.row top-aligned', [
            h('div', 'Data'), 
            h('div.mini-button', {
              attrs: {
                title: 'Add key value pair'
              }
            }, '+')
          ]),
          ...Object.entries(f.data).map(e => h('div.row top-aligned', [
            h('div.column', [
              h('label.label', {attrs: {for: `${baseID}-followup-data-key-editor-${e[0]}`}}, 'Key'),
              h('input', {
                attrs: {
                  value: e[0],
                  id: `${baseID}-followup-data-key-editor-${e[0]}`
                },
                on: {input: e => send({type: 'action_followup_data_key_rename', name: e.target.value, key: e[0], function: funcName, path: ['followups', i]})}
              })
            ]),
            h('div.column', [
              h('div.label', 'Value'),
              h('div.column', ResultDataView(
                state,
                send,
                funcName,
                e[1],
                `${baseID}-followup-data-value-editor-${e[0]}`,
                [index, 'followups', i, 'data', e[0]]
              ))
            ]),
            h('div.mini-button', {attrs: {title: 'Remove data item'}}, 'X')
          ]))
        ])
      ])) : [])
    ])
  ]
} 