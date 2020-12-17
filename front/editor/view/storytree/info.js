import {h} from 'snabbdom/h'
const FormatString = require('@infosecinnovations/fantastic-utils/formatstring')
import ParameterInput from '@infosecinnovations/fantastic-front/view/test/parameterinput'
import ParameterValue from '@infosecinnovations/fantastic-front/view/test/parametervalue'

export default (state, send) => {
  if (!state.editor.selected) return [h('div', 'TODO: story quest config')]
  const node = state.editor.nodes[state.editor.selected]
  const sliceIndex = node.key.lastIndexOf('/')
  const key = node.key.slice(sliceIndex + 1)
  const module = state.modules[node.key.slice(0, sliceIndex)]
  if (!module) return
  const data = module[node.type][key]
  return [
    h('h2', data.name),
    h('div.column', [
      h('label.label', {attrs: {for: 'node-description-editor'}}, 'Custom Description'),
      h('textarea#node-description-editor', {
        attrs: {rows: 7},
        on: {input: e => send({type: 'set_custom_description', id: state.editor.selected, description: e.target.value})}
      }, node.customDescription || (data.quest && data.quest.explanation) || '')
    ]),
    h('div.column', [
      h('div.label', 'Description'),
      h('div', data.description ? FormatString(data.description, data.parameters && data.parameters.reduce(
        (result, parameter) => ({...result, [parameter.name]: (node.parameters && node.parameters[parameter.name]) || parameter.default}), 
        {}
      )) : '')
    ]),
    data.parameters ? h('div.column', [
      h('div.label', 'Parameters'),
      h('ul', data.parameters.map(parameter => h('li.parameter', [
        h('label', {attrs: {for: `${state.editor.selected}-${parameter.name}`}}, parameter.name),
        h('input', {
          attrs: {
            id: `${state.editor.selected}-${parameter.name}`, 
            value: (node.parameters && node.parameters[parameter.name]) || parameter.default,
            type: ParameterInput(parameter.type)
          },
          on: {input: e => send({type: 'set_parameter', id: state.editor.selected, key: parameter.name, value: ParameterValue(parameter.type, e.target.value)})}
        })
      ])))
    ]) : undefined
  ]
}