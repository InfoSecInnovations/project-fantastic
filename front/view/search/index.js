const H = require('snabbdom/h').default
const DateSelect = require('./dateselect')
const ConnectionType = require('./connectiontype')

const search = (state, send) => {
  if (!state.nodes) return
  return H('div#search', [
    DateSelect(state, send),
    ConnectionType(state, send)
  ])
}

module.exports = search