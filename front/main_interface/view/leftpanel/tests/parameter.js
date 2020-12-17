import {h} from 'snabbdom/h'
import ParameterInput from '@infosecinnovations/fantastic-front/view/test/parameterinput'
import ParameterValue from '@infosecinnovations/fantastic-front/view/test/parametervalue'

export default (parameter_data, test, send, param) => {
  const value = parameter_data !== undefined ? parameter_data : param.default
  return h('div.item', [
    h('label', {attrs: {for: `param_${param.name}`}}, param.name), 
    h(`input#param_${param.name}`, {
      on: {input: e => send({type: 'test_parameter', key: param.name, value: ParameterValue(param.type, e.target.value), test})},
      attrs: {
        type: ParameterInput(param.type),
        value
      },
      props: {
        checked: param.type === 'bool' && value === 'true'
      }
    })
  ])
}