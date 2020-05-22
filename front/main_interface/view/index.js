const H = require('snabbdom/h').default
const LeftPanel = require('./leftpanel')
const Selection = require('./selection')
const Tooltip = require('./tooltip')
const Top = require('./top')

const view = (state, send) => 
  H('body', [
    H('div#container', [
      Top(state, send),
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