const H = require('snabbdom/h').default
const States = require('../util/states')

const view = (state, send) => 
  H('body', [
    H('h1', 'Network Viewer'),
    ...(state.nodes ? state.nodes.map((v, i) => States[v.State] == 'Established' ? H('div.node', [
      H('p', `Local Address: ${v.LocalAddress}`),
      H('p', `Local Port: ${v.LocalPort}`),
      H('p', `Remote Address: ${v.RemoteAddress}`),
      H('p', `Remote Port: ${v.RemotePort}`),
      H('p', `State: ${States[v.State]}`)
    ]) : undefined) : [])
  ])

  module.exports = view