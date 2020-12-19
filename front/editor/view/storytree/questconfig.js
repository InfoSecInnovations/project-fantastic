import {h} from 'snabbdom/h'

const hosts = ['local', 'remote']
const timeUnits = ['d', 'h', 'm']

export default (state, send) => [
  h('h2', 'Quest Settings'),
  h('div.column', [
    h('label.label', {attrs: {for: 'quest-description-editor'}}, 'Description'),
    h('textarea#quest-description-editor', {
      attrs: {rows: 7},
      on: {input: e => send({type: 'set_quest_description', description: e.target.value})}
    }, state.editor.description || '')
  ]),
  h('div.column', [
    h('div.label', 'Host Types'),
    ...hosts.map(host => h('span', [
      h('input', {
        attrs: {type: 'checkbox', id: `host-type-${host}`},
        on: {input: e => send({type: 'enable_quest_host_type', value: e.target.value, type: host})}
      }),
      h('label', {attrs: {for: `host-type-${host}`}}, host)
    ]))
  ]),
  h('div.column', [
    h('div.label', 'Host Selection'),
    h('span', [
      h('input', {
        attrs: {type: 'checkbox', id: 'quest-selection-time'},
        on: {input: e => send({type: 'enable_quest_selection-time', value: e.target.value})}
      }),
      h('label', {attrs: {for: 'quest-selection-time'}}, 'Maximum Age')
    ]),
    ...timeUnits.map(unit => h('span', [
      h('input', {
        attrs: {type: 'number', id: `quest-selection-time-${unit}`},
        on: {input: e => send({type: 'set_quest_time', value: e.target.value, unit})}
      }),
      h('label', {attrs: {for: `quest-selection-time-${unit}`}}, unit)
    ]))
  ])
]