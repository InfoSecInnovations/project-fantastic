import {h} from 'snabbdom/h'

export default (state, send, id, label, child) => [
  h('input.auto_foldout', {
    attrs: {type: 'checkbox', id, checked: state.foldout_checkboxes[id]},
    on: {input: e => send({type: 'foldout_checkbox', id, value: e.target.checked})}
  }),
  label,
  h('div.foldout_child', child)
]