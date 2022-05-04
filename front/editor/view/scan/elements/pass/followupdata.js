import {h} from 'snabbdom/h'
import ItemFromKey from '../../../../util/itemfromkey'
import ModuleFromKey from '../../../../util/modulefromkey'

const inputTypes = [
  'string',
  'number',
  'boolean',
  'array'
]

export default (state, send) => {
  const module = ModuleFromKey(state, state.scan.json.pass.failure.action.path)
  const actionName = ItemFromKey(state.scan.json.pass.failure.action.path)
  const data = module && actionName && module.actions && module.actions[actionName]
  return data ? h('div.column dividers', [
    h('div.row', [
      h('h4', 'Action Data'),
      h('div.mini-button', {
        on: {click: e => send({type: 'scan_failure_add_action_data'})},
        attrs: {title: 'add data value'}
      }, '+')
    ]),
    ...(state.scan.json.pass.failure.action.data ? Object.entries(state.scan.json.pass.failure.action.data).map(([key, value]) => {
      const arrayView = (value, inputView, indices = []) => value.map((value, i) => h('div.row', [
        ...inputView(value, [...indices, i]),
        h('div.mini-button', {
          on: {click: e => send({type: 'scan_failure_remove_action_data_array_item', key, isScanFailure: true, indices, index: i})},
          attrs: {title: 'remove array item'}
        }, 'X')
      ]))
      const valueInput = (value, indices = []) => {
        let inputType = typeof value
        if (Array.isArray(value)) inputType = 'array'
        const mainRow = () => [
          h('label.label', {attrs: {for: `scan-failure-action-data-type-${key}-${indices.join('-')}`}}, 'Data Type'),
          h('select', {
            on: {input: e => send({type: 'scan_failure_action_data_type', key, isScanFailure: true, indices, dataType: e.target.value})},
            attrs: {id: `scan-failure-action-data-type-${key}-${indices.join('-')}`}
          }, inputTypes.map(input => h('option', { attrs: {
            value: input,
            selected: input == inputType
          }}, input))),
          ...(inputType == 'array' ? [h('div.mini-button', {
            on: {click: e => send({type: 'scan_failure_add_action_data_array_item', key, isScanFailure: true, indices})},
            attrs: {title: 'add array item'}
          }, '+')] : 
          [
            h('label.label', {attrs: {for: `scan-failure-action-data-value-${key}-${indices.join('-')}`}}, 'Value'),
            h('input', {
              on: { input: e => send({type: 'scan_failure_action_data_value', key, isScanFailure: true, indices, value: inputType == 'boolean' ? e.target.checked : e.target.value})},
              attrs: {
                type: inputType == 'number' ? 'number' : inputType == 'boolean' ? 'checkbox' : 'text',
                id: `scan-failure-action-data-value-${key}-${indices.join('-')}`
              },
              props: {value}
            })
          ])
        ]
        if (inputType == 'array' && indices.length) return [h('div.column dividers', [
          h('div.row', mainRow()),
          ...arrayView(value, valueInput, indices)
        ])]
        return mainRow()
      }
      const mainRow = () => h('div.row', [
        h('label.label', {attrs: {for: `scan-failure-action-data-key-${key}`}}, 'Key'),
        h('input', {
          on: { input: e => send({type: 'scan_failure_action_data_key', key, newKey: e.target.value})},
          props: {value: key},
          attrs: {id: `scan-failure-action-data-key-${key}`}
        }),
        ...valueInput(value),
        h('div.mini-button', {
          on: {click: e => send({type: 'scan_failure_remove_action_data', key})},
          attrs: {title: 'remove data value'}
        }, 'X')
      ])
      if (Array.isArray(value)) return h('div.column dividers', [
        mainRow(),
        ...arrayView(value, valueInput)
      ])
      return mainRow()
    }) : [])
  ]) : undefined
}