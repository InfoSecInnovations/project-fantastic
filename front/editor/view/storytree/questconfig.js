import {h} from 'snabbdom/h'

const hosts = ['local', 'remote']
const timeUnits = ['d', 'h', 'm']
const roles = ['user', 'elevated', 'admin']

export default (state, send) => [
  h('h3', 'Quest Settings'),
  h('div.column', [
    h('label.label', {attrs: {for: 'quest-name-editor'}}, 'Name'),
    h('input#quest-name-editor', {
      attrs: {value: state.storyTree.name || ''},
      on: {input: e => send({type: 'set_quest_name', name: e.target.value})}
    })
  ]),
  h('div.column', [
    h('label.label', {attrs: {for: 'quest-description-editor'}}, 'Description'),
    h('textarea#quest-description-editor', {
      attrs: {rows: 7},
      on: {input: e => send({type: 'set_quest_description', description: e.target.value})}
    }, state.storyTree.description || '')
  ]),
  h('div.column', [
    h('div.label', 'Host Types'),
    ...hosts.map(host => h('span', [
      h('input', {
        attrs: {type: 'checkbox', id: `host-type-${host}`},
        props: {checked: state.storyTree.config.hosts.includes(host)},
        on: {input: e => send({type: 'enable_quest_host_type', enabled: e.target.checked, host})}
      }),
      h('label', {attrs: {for: `host-type-${host}`}}, host)
    ]))
  ]),
  h('div.column', [
    h('label.label', {attrs: {for: 'quest-role-editor'}}, 'Role'),
    h('select#quest-role-editor', {
      on: { input: e => send({type: 'set_quest_role', role: e.target.value}) }
    }, roles.map((role, i) => h('option', { attrs: { value: role, selected: state.storyTree.config.role == role || (!state.storyTree.config.role && i == 0) }}, role)))
  ]),
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