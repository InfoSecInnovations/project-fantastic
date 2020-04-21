const H = require('snabbdom/h').default
const LeftPanel = require('./leftpanel')
const Selection = require('./selection')
const Search = require('./search')
const Tooltip = require('./tooltip')

const view = (state, send) => 
  H('body', [
    H('div#container', [
      H('div#top', [
        H('h1', "Fantastic"),
        Search(state, send),
        H('div.icon_button.tooltippable', {
          on: {click: e => window.open('help/index.md', '_blank')}
        }, [
          H('span.fas fa-question-circle'),
          H('div.tooltip', H('div.item', 'Help'))
        ])
      ]),
      H('div#main', [
        H('div#graph_container', {
          hook: {create: (_, vnode) => setTimeout(() => send({type: 'graph_container', container: vnode.elm}))},
          style: {display: state.loading ? 'none' : 'block'}
        }),
        state.loading ? H('div#loading', 'Loading...') : undefined,
        LeftPanel(state, send),
        Selection(state, send),
        Tooltip(state)
      ])
    ])
  ])

  module.exports = view