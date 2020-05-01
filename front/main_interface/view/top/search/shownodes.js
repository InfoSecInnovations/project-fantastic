const H = require('snabbdom/h').default

const showNodes = (state, send) => H('div.selector', [
  H('label', {attrs: {for: 'show_nodes_select'}}, 'Show hosts outside my network'),
  H('input#show_nodes_select', {
    attrs: {type: 'checkbox', checked: state.search.show_external},
    on: {change: [send, {type: 'show_external', value: !state.search.show_external}]}
  })
])

module.exports = showNodes