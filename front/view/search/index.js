const H = require('snabbdom/h').default
const DateSelect = require('./dateselect')
const ConnectionType = require('./connectiontype')
const ConnectionState = require('./connectionstate')

const search = (state, send) => {
  if (!state.nodes) return
  return H('div#search', [
    DateSelect(state, send),
    ConnectionType(state, send),
    ConnectionState(state, send),
    H('div.button', {on: {click: [send, {type: 'search'}]}}, 'Search')
  ])
}

module.exports = search