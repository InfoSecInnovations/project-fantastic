import {h} from 'snabbdom/h'

const parseValue = (type, value) => {
  if (type === 'number') return parseFloat(value)
  if (type === 'bool') return value === 'true'
  return value
}

const inputType = type => {
  if (type === 'number') return 'number'
  if (type === 'bool') return 'checkbox'
  return 'text'
}

export default (parameter_data, test, send, param) => {
  const value = parameter_data !== undefined ? parameter_data : param.default
  return h('div.item', [
    h('label', {attrs: {for: `param_${param.name}`}}, param.name), 
    h(`input#param_${param.name}`, {
      on: {input: e => send({type: 'test_parameter', key: param.name, value: parseValue(param.type, e.target.value), test})},
      attrs: {
        type: inputType(param.type),
        value
      },
      props: {
        checked: param.type === 'bool' && value === 'true'
      }
    })
  ])
}