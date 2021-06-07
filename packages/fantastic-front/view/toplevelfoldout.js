import {h} from 'snabbdom/h'

export default (state, send, id, label, child) => h('div', [
  h('input.auto_foldout', {
    attrs: {checked: typeof state.foldout_checkboxes[id] == 'undefined' ? true : state.foldout_checkboxes[id], type: 'checkbox', id},
    on: {input: e => send({type: 'foldout_checkbox', id, value: e.target.checked})}
  }),
  h('div.item', [
    h('label', {attrs: {for: id}}, label)
  ]),
  h('div.foldout_child', child)
])