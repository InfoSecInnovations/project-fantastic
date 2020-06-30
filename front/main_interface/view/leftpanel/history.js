const H = require('snabbdom/h').default

const history = (state, send) => H('div.scroll_container.panel', [
  H('div.item', [
    H('div.title', 'History')
  ]),
])

module.exports = history