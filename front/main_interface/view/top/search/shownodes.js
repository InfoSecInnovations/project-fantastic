import {h} from 'snabbdom/h'

export default (state, send) => h('div.selector', [
  h('label', {attrs: {for: 'show_nodes_select'}}, 'Show hosts outside my network'),
  h('input#show_nodes_select', {
    attrs: {type: 'checkbox', disabled: state.loading, checked: state.search.show_external},
    on: {change: [send, {type: 'show_external', value: !state.search.show_external}]}
  })
])