import {h} from 'snabbdom/h'
import hosts from './hosts'
import roles from './roles'

export default (state, send, itemType) => {
  const json = state[itemType].json
  return [
    h('div.column', [
      h('label.label', {attrs: {for: `${itemType}-name-editor`}}, 'Name'),
      h('input', {
        attrs: {
          value: json.name || '',
          id: `${itemType}-name-editor`
        },
        on: {input: e => send({type: 'set_name', itemType, name: e.target.value})}
      })
    ]),
    h('div.column', [
      h('label.label', {attrs: {for: `${itemType}-description-editor`}}, 'Description'),
      h('textarea', {
        attrs: {
          rows: 7,
          id: `${itemType}-description-editor`
        },
        on: {input: e => send({type: 'set_description', itemType, description: e.target.value})}
      }, json.description || '')
    ]),
    h('div.column', [
      h('div.label', 'Host Types'),
      ...hosts.map(host => h('span', [
        h('input', {
          attrs: {type: 'checkbox', id: `${itemType}-host-type-${host}`},
          props: {checked: json.hosts.includes(host)},
          on: {input: e => send({type: 'enable_host', itemType, enabled: e.target.checked, host})}
        }),
        h('label', {attrs: {for: `${itemType}-host-type-${host}`}}, host)
      ]))
    ]),
    h('div.column', [
      h('label.label', {attrs: {for: `${itemType}-role-editor`}}, 'Role'),
      h('select', {
        attrs: {id: `${itemType}-role-editor`},
        on: { input: e => send({type: 'set_role', itemType, role: e.target.value}) }
      }, roles.map((role, i) => h('option', { attrs: { value: role, selected: json.role == role || (!json.role && i == 0) }}, role)))
    ])
  ]
} 