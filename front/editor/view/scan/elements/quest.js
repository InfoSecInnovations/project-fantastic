import ParameterInput from '@infosecinnovations/fantastic-front/view/scan/parameterinput'
import {h} from 'snabbdom/h'

const timeKeys = [
  'd',
  'h',
  'm',
  's'
]

export default (state, send) => h('div.column', [
  h('h3', 'Quest configuration'),
  h('div.column', [
    h('div.row', [
      h('label.label', { attrs: {for: `${state.scan.filename}-scan-quest-explanation`}}, 'Explanation'),
      h('input', {
        attrs: {id: `${state.scan.filename}-scan-quest-explanation`},
        props: {value: state.scan.json.quest.explanation || ''},
        on: {input: e => send({type: 'scan_quest_explanation', value: e.target.value})}
      })
    ]),
    h('div.label', "This information will be appended to the scan's description to explain why you might want to do this check.")
  ]),
  ...(state.scan.json.parameters && state.scan.json.parameters.length ? [
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
  ] : []),
  h('div', [
    h('h4', 'Host Selection'),
    h('div.label', 'Unlike running a scan which operates on the current selection, daily quests will search all known hosts using the criteria below.')
  ]),
  h('div', [
    h('div', 'Time last seen'),
    h('div.label', 'How far back in time do we look for host data? If you put something too big here, you run the risk of scanning a very large amount of data!')
  ]),
  h('div.row', timeKeys.map(unit => h('div.row', [
    h('div.label', {attrs: {for: `${state.scan.filename}-scan-quest-selection-${unit}`}}, unit),
    h('input', {
      attrs: {
        id: `${state.scan.filename}-scan-quest-selection-${unit}`,
        type: 'number',
        min: 0
      },
      props: {
        value: state.scan.json.quest.selection.age[unit] || 0
      },
      on: {input: e => send({type: 'scan_quest_selection_time', unit, value: parseInt(e.target.value)})},
    })
  ])))
])