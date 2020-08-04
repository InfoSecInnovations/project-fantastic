const H = require('snabbdom/h').default
const NodeTop = require('./nodetop')
const Connections = require('../connections')

const info = (state, send, node) => H('div.scroll_container', [
    NodeTop(node),
    ...Connections(node.connections)
  ])

module.exports = info