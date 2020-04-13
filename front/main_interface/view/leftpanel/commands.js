const H = require('snabbdom/h').default
const HostString = require('../../../common/util/hoststring')

const commands = (state, send) => H('div.scroll_container.panel', [
  H('div.item', [
    H('div.title', 'Host Data Commands')
  ]),
  H('div.scroll', Object.entries(state.commands).map(v => H('div.scroll_item', [
    H('div.item', [
      H('div.subtitle', v[1].name),
      H('div.button', 
        {
          on: {click: [send, {type: 'enable_command', command: v[0], enabled: !v[1].enabled}]},
          class: {disabled: !v[1].enabled}
        }, 
        v[1].enabled ? 'Enabled' : 'Disabled')
    ]),
    v[1].description ? H('div.item', v[1].description) : undefined,
    H('div.targets', [H('b', 'Valid targets:'), ` ${v[1].hosts.map(HostString).join(', ')}.`])
  ])))
])

module.exports = commands