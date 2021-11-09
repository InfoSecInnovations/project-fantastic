import {h} from 'snabbdom/h'
import hosts from './hosts'
import roles from './roles'

export default (state, send, prefix, nameValue, setNameAction, descriptionValue, setDescriptionAction, hostsValue, setHostAction, roleValue, setRoleAction) => [
  h('div.column', [
    h('label.label', {attrs: {for: `${prefix}-name-editor`}}, 'Name'),
    h('input', {
      attrs: {
        value: nameValue || '',
        id: `${prefix}-name-editor`
      },
      on: {input: e => send({type: setNameAction, name: e.target.value})}
    })
  ]),
  h('div.column', [
    h('label.label', {attrs: {for: `${prefix}-description-editor`}}, 'Description'),
    h('textarea', {
      attrs: {
        rows: 7,
        id: `${prefix}-description-editor`
      },
      on: {input: e => send({type: setDescriptionAction, description: e.target.value})}
    }, descriptionValue || '')
  ]),
  h('div.column', [
    h('div.label', 'Host Types'),
    ...hosts.map(host => h('span', [
      h('input', {
        attrs: {type: 'checkbox', id: `${prefix}-host-type-${host}`},
        props: {checked: hostsValue.includes(host)},
        on: {input: e => send({type: setHostAction, enabled: e.target.checked, host})}
      }),
      h('label', {attrs: {for: `${prefix}-host-type-${host}`}}, host)
    ]))
  ]),
  h('div.column', [
    h('label.label', {attrs: {for: `${prefix}-role-editor`}}, 'Role'),
    h('select', {
      attrs: {id: `${prefix}-role-editor`},
      on: { input: e => send({type: setRoleAction, role: e.target.value}) }
    }, roles.map((role, i) => h('option', { attrs: { value: role, selected: roleValue == role || (!roleValue && i == 0) }}, role)))
  ])
]