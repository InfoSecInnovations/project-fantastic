import {h} from 'snabbdom/h'

export default (send, search_type) => h('div.item', [
  h('input', {
    attrs: {type: 'text'},
    on: {input: e => send({type: 'search_input', query: e.target.value, search_type})}
  }),
  h('label.fas fa-search fa-fw')
])