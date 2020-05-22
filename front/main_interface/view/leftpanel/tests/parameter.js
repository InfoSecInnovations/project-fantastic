const H = require('snabbdom/h').default

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

const parameter = (parameter_data, test, send, param) => {
  const value = parameter_data !== undefined ? parameter_data : param.default
  return H('div.item', [
    H('label', {attrs: {for: `param_${param.name}`}}, param.name), 
    H(`input#param_${param.name}`, {
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

module.exports = parameter