const H = require('snabbdom/h').default
const Info = require('./info')
const Search = require('./search')

const view = (state, send) => 
  H('body', [
    H('div#graph_container', {
      hook: {create: (_, vnode) => setTimeout(() => send({type: 'graph_container', container: vnode.elm}))}
    }),
    H('div#ui', [
      H('div#top', [
        H('h1', "Mick and Seb's Fantastic Network Viewer"),
        Search(state, send)
      ]),
      Info(state, send)
    ])
  ])

  module.exports = view