import {h} from 'snabbdom/h'
const FormatString = require('@infosecinnovations/fantastic-utils/formatstring')
import ParameterInput from '@infosecinnovations/fantastic-front/view/scan/parameterinput'
import ParameterValue from '@infosecinnovations/fantastic-front/view/scan/parametervalue'

const getParameterValue = (data, node, parameter) => (node.parameters && node.parameters[parameter.name]) || (data.quest && data.quest.parameters && data.quest.parameters[parameter.name]) || parameter.default

export default (state, send, id) => {
  const node = state.editor.nodes[id]
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
        on: {input: e => send({type: 'set_custom_description', id, description: e.target.value})}
      }, node.customDescription || (data.quest && data.quest.explanation) || '')
    ]),
    h('div.column', [
      h('div.label', 'Description'),
      h('div', data.description ? FormatString(data.description, data.parameters && data.parameters.reduce(
        (result, parameter) => ({...result, [parameter.name]: getParameterValue(data, node, parameter)}), 
        {}
      )) : '')
    ]),
    data.parameters ? h('div.column', [
      h('div.label', 'Parameters'),
      h('ul', data.parameters.map(parameter => h('li.parameter', [
        h('label', {attrs: {for: `${id}-${parameter.name}`}}, parameter.name),
        h('input', {
          attrs: {
            id: `${id}-${parameter.name}`, 
            value: getParameterValue(data, node, parameter),
            type: ParameterInput(parameter.type)
          },
          on: {input: e => send({type: 'set_parameter', id, key: parameter.name, value: ParameterValue(parameter.type, e.target.value)})}
        })
      ])))
    ]) : undefined
  ]
}