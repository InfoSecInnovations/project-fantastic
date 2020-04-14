const H = require('snabbdom/h').default
const HostString = require('../../../common/util/hoststring')

const quests = (state, send) => H('div.scroll_container.panel', [
  H('div.item', [
    H('div.title', 'Quests')
  ]),
  H('div.scroll', Object.entries(state.quests).map(v => H('div.scroll_item', [
    H('div.item', [
      H('div.subtitle', v[1].name),
    ]),
    v[1].description ? H('div.item', v[1].description) : undefined,
    H('div.targets', [H('b', 'Valid targets:'), ` ${v[1].hosts.map(HostString).join(', ')}.`])
  ])))
])

module.exports = quests