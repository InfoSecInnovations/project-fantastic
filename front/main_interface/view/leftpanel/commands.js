import {h} from 'snabbdom/h'
import HostString from '@infosecinnovations/fantastic-front/util/hoststring'
import SearchBar from '@infosecinnovations/fantastic-front/view/searchbar'
import FilterSearchResults from '@infosecinnovations/fantastic-front/util/filtersearchresults'
const HasRole = require('@infosecinnovations/fantastic-utils/hasrole')

const enabled_button = (state, send, command, data) => {
  if (data.mode == 'force') return h('div', 'This command must always be enabled')
  if (HasRole(state.user, data.role)) return state.command_status[command] == 'loading' ? 
  h('div.button disabled', 'Updating status...') :
  h('div.button', 
    {
      on: {click: [send, {type: 'enable_command', command, enabled: data.mode != 'enabled'}]}
    }, 
    data.mode == 'enabled' ? 'Enabled' : 'Disabled')
  return h('div', `${data.mode == 'enabled' ? 'Enabled' : 'Disabled'} (requires ${data.role} role to change)`)
}

export default (state, send) => {
  const commands = FilterSearchResults(state, 'commands')
  return h('div.scroll_container', [
    h('h2.panel_title', 'Host Data Commands'),
    SearchBar(send, 'commands'),
    h('div.scroll spaced', Object.entries(commands).map(v => h('div.scroll_item spaced', [
      h('div.item command_title', [
        h('h3', v[1].name),
        enabled_button(state, send, v[0], v[1]),
      ]),
      h('pre', v[1].command),
      v[1].description ? h('div.item', v[1].description) : undefined,
      h('div.targets', [h('b', 'Valid targets:'), ` ${v[1].hosts.map(HostString).join(', ')}.`])
    ])))
  ])
}