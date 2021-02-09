import {h} from 'snabbdom/h'
import ParameterInput from '@infosecinnovations/fantastic-front/view/test/parameterinput'
import ParameterValue from '@infosecinnovations/fantastic-front/view/test/parametervalue'

export default (parameter_data, scan, send, param) => {
  const value = parameter_data !== undefined ? parameter_data : param.default
  return h('div.item', [
    h('label', {attrs: {for: `param_${param.name}`}}, param.name), 
    h(`input#param_${param.name}`, {
      on: {input: e => send({type: 'scan_parameter', key: param.name, value: ParameterValue(param.type, e.target.value), scan})},
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