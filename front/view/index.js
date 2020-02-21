const H = require('snabbdom/h').default
const Commands = require('./commands')
const Selection = require('./selection')
const Search = require('./search')
const Tooltip = require('./tooltip')

const view = (state, send) => 
  H('body', [
    H('div#container', [
      H('div#top', [
        H('h1', "Fantastic"),
        Search(state, send)
      ]),
      H('div#main', [
        H('div#graph_container', {
          hook: {create: (_, vnode) => setTimeout(() => send({type: 'graph_container', container: vnode.elm}))},
          style: {display: state.loading ? 'none' : 'block'}
        }),
        state.loading ? H('div#loading', 'Loading...') : undefined,
        Commands(state, send),
        Selection(state, send),
        Tooltip(state)
      ])
    ])
  ])

  module.exports = view