import {h} from 'snabbdom/h'
import ParameterInput from '@infosecinnovations/fantastic-front/view/scan/parameterinput'

const parameterTypes = [
  'bool',
  'number',
  'text'
]

export default (state, send) => h('div.column', [
  h('div.row bottom-aligned', [
    h('h4', 'Parameters'),
    h('div.label', 'These values can be set by the user to adjust the action result filtering.'),
    h('div.mini-button', {
      attrs: {title: 'Add parameter'},
      on: {click: e => send({type: 'add_scan_parameter'})}
    }, '+')
  ]),
  ...(state.scan.json.parameters ? state.scan.json.parameters.map((parameter, i) => {
    const inputType = ParameterInput(parameter.type)
    return h('div.row', [
      h('label.label', {attrs: {for: `${state.scan.filename}-scan-parameters-${i}-name`}}, 'Name'),
      h('input', {
        props: {value: parameter.name},
        attrs: {id: `${state.scan.filename}-scan-parameters-${i}-name`},
        on: {input: e => send({type: 'scan_parameter_name', index: i, value: e.target.value})}
      }),
      h('label.label', {attrs: {for: `${state.scan.filename}-scan-parameter-${i}-type`}}, 'Input Type'),
      h('select', {
        attrs: {id: `${state.scan.filename}-scan-parameter-${i}-type`},
        on: { input: e => send({type: 'scan_parameter_type', value: e.target.value, index: i}) }
      }, parameterTypes.map(type => h('option', { attrs: { value: type, selected: parameter.type == type || (type == 'text' && !parameter.type) }}, type))),
      h('label.label', {attrs: {for: `${state.scan.filename}-scan-parameter-${i}-default` }}, 'Default value'),
      h('input', {
        on: { input: e => send({type: 'scan_parameter_default', value: inputType == 'checkbox' ? e.target.checked : e.target.value, index: i})},
        attrs: {
          id: `${state.scan.filename}-scan-parameter-${i}-default`,
          type: inputType
        },
        props: { value: parameter.default || '', checked: parameter.default || false }
      })
    ])
  }) : [])
])