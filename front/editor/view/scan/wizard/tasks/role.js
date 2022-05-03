import {h} from 'snabbdom/h'
import roles from '../../../common/roles'

export default {
  title: 'Set Role',
  description: "The minimum access role required to use this scan. You should use the elevated role for anything that can interfere with the targeted hosts.",
  view: (state, send) => h('div.column', [
    h('label.label', {attrs: {for: `scan-role-editor`}}, 'Role'),
    h('select', {
      attrs: {id: `scan-role-editor`},
      on: { input: e => send({type: 'set_role', itemType: 'scan', role: e.target.value}) }
    }, roles.map((role, i) => h('option', { attrs: { value: role, selected: state.scan.json.role == role || (!state.scan.json.role && i == 0) }}, role)))
  ])
}