import {h} from 'snabbdom/h'
import hosts from '../common/hosts'
import Info from '../common/info'
import roles from '../common/roles'

const timeUnits = ['d', 'h', 'm']

export default (state, send) => [
  h('h3', 'Quest Settings'),
  ...Info(
    state,
    send,
    'quest',
    state.storyTree.name,
    'set_quest_name',
    state.storyTree.description,
    'set_quest_description',
    state.storyTree.config.hosts,
    'enable_quest_host_type',
    state.storyTree.config.role,
    'set_quest_role'
  ),
  h('div.column', [
    h('div.label', 'Host Selection'),
    h('span', [
      h('input', {
        attrs: {type: 'checkbox', id: 'quest-selection-age'},
        props: {checked: state.storyTree.config.selection.age.enabled},
        on: {input: e => send({type: 'enable_quest_age', enabled: e.target.checked})}
      }),
      h('label', {attrs: {for: 'quest-selection-age'}}, 'Maximum Age')
    ]),
    ...(state.storyTree.config.selection.age.enabled ? timeUnits.map(unit => h('span', [
      h('input', {
        attrs: {type: 'number', id: `quest-selection-age-${unit}`},
        props: {value: state.storyTree.config.selection.age[unit]},
        on: {input: e => send({type: 'set_quest_age', value: e.target.value, unit})}
      }),
      h('label', {attrs: {for: `quest-selection-age-${unit}`}}, unit)
    ])) : [])
  ])
]