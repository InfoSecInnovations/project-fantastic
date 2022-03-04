import {h} from 'snabbdom/h'
import ResultDataView from '../resultdataview'

export default (state, send, funcName) => {
  const data = state.action.json.functions[funcName].result
  const baseID = `${state.action.filename}-${funcName}`
  const basePath = []
  return h('div.dividers', [
    Object.keys(state.action.json.functions).find(k => k != 'run') ? h('div.row bottom-aligned', [
      h('h4', 'Followup Actions'), 
      h('div.label', 'Followup actions allow you to run another function belonging to this action using the output from the current function.'),
      h('div.mini-button', {
        on: {click: e => send({type: 'add_result_followup', funcName, resultIndex: index})},
        attrs: {title: 'Add followup'}
      }, '+')
    ]) : h('div', 'Create followup functions to enable followup actions.'),
    ...(data.followups ? data.followups.map((f, i) => h('div.column', [
      h('div.item', [
        h('div.row', [
          h('label', {attrs: {for: `${baseID}-followups-${i}-function`}}, 'Function'),
          h('select', {
            on: {input: e => send({type: 'set_followup_function', followupIndex: i, resultIndex: index, funcName, followup: e.target.value})},
            attrs: {id: `${baseID}-followups-${i}-function`}
          }, Object.entries(state.action.json.functions)
            .filter(([func, data]) => func !== funcName && func !== 'run')
            .map(([func, data]) => h('option', {attrs: {value: func, selected: func == f.function}}, data.name || func))
          )
        ]),
        !state.action.json.functions[f.function] ? h('div.label', 'WARNING: function doesn\'t exist!') : undefined,
        h('div.mini-button', {
          on: {click: e => send({type: 'remove_result_followup', funcName, followupIndex: i, resultIndex: index})},
          attrs: {title: 'Remove followup'}
        }, 'X')
      ]),
      h('div.row top-aligned', [
        h('div.column', [
          h('div.row', [
            h('input', {
              attrs: {type: 'checkbox', id: `${baseID}-followups-${i}-enabled`}, 
              props: {checked: f.hasOwnProperty('enabled')},
              on: { input: e => send({type: 'action_followup_enabled_status', funcName, followupIndex: i, resultIndex: index, value: e.target.checked}) }
            }),
            h('label', {for: `${baseID}-followups-${i}-enabled`}, 'Enabled status')
          ]),
          h('div.label', 'Select a property to show a special enabled/disabled button instead of the name of the followup function. This property should output a true/false value, so you probably want to use the bool result type.')
        ]),
        f.hasOwnProperty('enabled') ? h('div.column', ResultDataView(
          state,
          send,
          funcName,
          f.enabled,
          `${baseID}-followups-${i}-enabled-data`,
          [...basePath, 'followups', i, 'enabled']
        )) : undefined
      ]),
      h('div.dividers', [
        h('div.row bottom-aligned', [
          h('div', 'Data'), 
          h('div.mini-button', {
            on: { click: e => send({type: 'action_followup_data_add_entry', funcName, followupIndex: i, resultIndex: index}) },
            attrs: { title: 'Add key value pair' }
          }, '+')
        ]),
        ...Object.entries(f.data).map(e => h('div.row top-aligned', [
          h('div.column', [
            h('label.label', {attrs: {for: `${baseID}-followup-data-key-editor-${e[0]}`}}, 'Variable name'),
            h('input', {
              props: {value: e[0]},
              attrs: {
                id: `${baseID}-followup-data-key-editor-${e[0]}`
              },
              on: {input: ev => send({type: 'action_followup_data_key_rename', newName: ev.target.value, key: e[0], funcName, followupIndex: i, resultIndex: index})}
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
              [...basePath, 'followups', i, 'data', e[0]]
            ))
          ]),
          h('div.mini-button', {
            on: { click: ev => send({type: 'action_followup_data_remove_entry', funcName, followupIndex: i, resultIndex: index, key: e[0]}) },
            attrs: {title: 'Remove data item'}
          }, 'X')
        ]))
      ])
    ])) : [])
  ])
} 