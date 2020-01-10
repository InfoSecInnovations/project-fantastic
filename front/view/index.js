const H = require('snabbdom/h').default
const Nodes = require('./nodes')
const Info = require('./info')

const view = (state, send) => 
  H('body', [
    H('div#graph_container', {
      hook: {create: (_, vnode) => setTimeout(() => send({type: 'graph_container', container: vnode.elm}))}
    }),
    //Nodes(state, send),
    H('div#ui', [
      H('h1', "Mick and Seb's Fantastic Network Viewer"),
      Info(state, send)
    ])
  ])

  module.exports = view