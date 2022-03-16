import {h} from 'snabbdom/h'
import Info from '../common/info'

const timeUnits = ['d', 'h', 'm']

export default (state, send) => [
  h('h3', 'Quest Settings'),
  ...Info(state, send, 'storyTree'),
  h('div.column', [
    h('div.label', 'Host Selection'),
    h('span', [
      h('input', {
        attrs: {type: 'checkbox', id: 'quest-selection-age'},
        props: {checked: state.storyTree.json.selection.age.enabled},
        on: {input: e => send({type: 'enable_quest_age', enabled: e.target.checked})}
      }),
      h('label', {attrs: {for: 'quest-selection-age'}}, 'Maximum Age')
    ]),
    ...(state.storyTree.json.selection.age.enabled ? timeUnits.map(unit => h('span', [
      h('input', {
        attrs: {type: 'number', id: `quest-selection-age-${unit}`},
        props: {value: state.storyTree.json.selection.age[unit]},
        on: {input: e => send({type: 'set_quest_age', value: e.target.value, unit})}
      }),
      h('label', {attrs: {for: `quest-selection-age-${unit}`}}, unit)
    ])) : [])
  ])
]