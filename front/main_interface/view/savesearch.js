import {h} from 'snabbdom/h'

const inner = (state, send) => {
  if (state.save_search_dialog == 'waiting') return h('div#save_dialog', 'Saving...')
  return h('div#save_dialog', [
    h('div.item', [
      h('label', {attrs: {for: 'search_label_input'}}, 'Filter name'),
      h('input#search_label_input', {
        attrs: {value: state.search.label || ''}, 
        on: {input: e => send({type: 'search_label', label: e.target.value})}})
    ]),
    h('div.dialog_buttons', [
      h('div.button', {on: {click: e => send({type: 'save_search'})}}, 'OK'),
      h('div.button', {on: {click: e => send({type: 'save_search_dialog', state: 'disabled'})}}, 'Cancel')
    ])
  ])
}

export default (state, send) => {
  if (!state.save_search_dialog || state.save_search_dialog == 'disabled') return
  return h('div.blur', inner(state, send))
}
