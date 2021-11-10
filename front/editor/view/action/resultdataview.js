import {h} from 'snabbdom/h'

const valueTypes = [
  'string',
  'array',
  'map',
  'labelled',
  'static',
  'bool',
  'combine',
  'date',
  'key_value_string'
]

const resultDataView = (state, send, funcName, resultData, id, path) => {
  let valueType = 'string'
  if (Array.isArray(resultData)) valueType = 'array'
  for (const type of valueTypes) {
    if (resultData[type]) {
      valueType = type
      break
    } 
  }
  let fieldEditor
  if (valueType == 'string') fieldEditor = h('input', {attrs: {type: 'text'}, props: {value: resultData}})
  return [
    h('div.row', [
      h('label.label', {attrs: {for: `${id}-value-type`}}, 'Value type'),
      h('select', {
        attrs: {id: `${id}-value-type`},
        on: {input: e => send({type: 'set_value_type', funcName, type: e.target.value, path})}
      }, valueTypes.map(value => h('option', {attrs: {value, selected: value == valueType}}, value)))
    ]),
    fieldEditor
  ]
}

export default resultDataView