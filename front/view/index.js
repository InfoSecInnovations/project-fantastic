const H = require('snabbdom/h').default
const Info = require('./info')
const Search = require('./search')

const view = (state, send) => 
  H('body', [
    H('div#container', [
      H('div#top', [
        H('h1', "Mick and Seb's Fantastic Network Viewer"),
        Search(state, send)
      ]),
      H('div#main', [
        H('div#graph_container', {
          hook: {create: (_, vnode) => setTimeout(() => send({type: 'graph_container', container: vnode.elm}))}
        }),
        Info(state, send)
      ])
    ])
  ])

  module.exports = view