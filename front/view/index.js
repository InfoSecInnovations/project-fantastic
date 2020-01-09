const H = require('snabbdom/h').default
const Nodes = require('./nodes')

const view = (state, send) => 
  H('body', [
    H('h1', 'Network Viewer'),
    Nodes(state, send)
  ])

  module.exports = view