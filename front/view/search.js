const H = require('snabbdom/h').default

const search = (state, send) => {
  if (!state.nodes) return
  return H('div#search', [

  ])
}

module.exports = search