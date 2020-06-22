const H = require('snabbdom/h').default
const HostString = require('../../../common/util/hoststring')
const HasRole = require('fantastic-utils/hasrole')

const enabled_button = (state, send, command, data) => {
  if (data.mode == 'force') return H('div', 'This command must always be enabled')
  if (HasRole(state.user, data.role)) return H('div.button', 
    {
      on: {click: [send, {type: 'enable_command', command, enabled: data.mode != 'enabled'}]},
      class: {disabled: data.mode != 'enabled'}
    }, 
    data.mode == 'enabled' ? 'Enabled' : 'Disabled')
  return H('div', `${data.mode == 'enabled' ? 'Enabled' : 'Disabled'} (requires ${data.role} role to change)`)
}

const commands = (state, send) => H('div.scroll_container.panel', [
  H('div.item', [
    H('div.title', 'Host Data Commands')
  ]),
  H('div.scroll', Object.entries(state.commands).map(v => H('div.scroll_item', [
    H('div.item', [
      H('div.subtitle', v[1].name),
      enabled_button(state, send, v[0], v[1]),
    ]),
    H('pre.command', v[1].command),
    v[1].description ? H('div.item', v[1].description) : undefined,
    H('div.targets', [H('b', 'Valid targets:'), ` ${v[1].hosts.map(HostString).join(', ')}.`])
  ])))
])

module.exports = commands