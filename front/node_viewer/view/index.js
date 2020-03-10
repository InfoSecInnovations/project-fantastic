const H = require('snabbdom/h').default
const Info = require('../../common/view/info')
const Actions = require('../../common/view/actions')

const view = (state, send) => 
  H('body', H('div#container', state.node_data ? [
    H('div.column', [
      H('div.title', 'Info'),
      Info(state, send, state.node_data)
    ]),
    H('div.column', [
      H('div.title', 'Actions'),
      Actions(state, send, state.node_data)
    ])
  ] : H('div.title', 'Loading data...')))

module.exports = view