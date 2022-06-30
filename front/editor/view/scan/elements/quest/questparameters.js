import ParameterInput from '@infosecinnovations/fantastic-front/view/scan/parameterinput'
import {h} from 'snabbdom/h'

export default (state, send) => state.scan.json.parameters && state.scan.json.parameters.length ? [
  h('h4', 'Parameters'),
  h('div.column', state.scan.json.parameters.map(parameter => {
    const value = (state.scan.json.quest.parameters && state.scan.json.quest.parameters[parameter.name]) || parameter.default
    const inputType = ParameterInput(parameter.type)
    return h('div.row', [
      h('div.label', parameter.name),
      h('input', {
        attrs: {
          id: `${state.scan.filename}-quest-parameter-${parameter.name}-default`,
          type: inputType
        },
        props: { value: value || '', checked: value || false },
        on: {input: e => send({type: 'scan_quest_parameter_value', value: inputType == 'checkbox' ? e.target.checked : e.target.value, key: parameter.name})}
      })
    ])
  }))
] : []