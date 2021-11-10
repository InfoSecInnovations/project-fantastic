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
  else if (typeof valueTypes == 'object') valueTypes.forEach(t => {
    if (resultData[t]) valueType = t
  })
  let fieldEditor
  if (valueType == 'string') fieldEditor = h('input', {attrs: {type: 'text'}})
  return [
    h('label', {attrs: {for: `${id}-value-type`}}, 'Value type'),
    h('select', {
      attrs: {id: `${id}-value-type`},
      on: {input: e => send({type: 'set_value_type', funcName, type: e.target.value, path})}
    },  valueTypes.map(value => h('option', {value, selected: value == valueType}, value))),
    fieldEditor
  ]
}

export default resultDataView