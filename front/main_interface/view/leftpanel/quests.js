const H = require('snabbdom/h').default
const HostString = require('../../../common/util/hoststring')

const quests = (state, send) => H('div.scroll_container.panel', [
  H('div.item', [
    H('div.title', 'Quests')
  ]),
  H('div.scroll')
])

module.exports = quests