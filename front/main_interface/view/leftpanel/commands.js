import {h} from 'snabbdom/h'
import HostString from '@infosecinnovations/fantastic-front/util/hoststring'
import SearchBar from '@infosecinnovations/fantastic-front/view/searchbar'
import FilterSearchResults from '@infosecinnovations/fantastic-front/util/filtersearchresults'
import FavoriteButton from '@infosecinnovations/fantastic-front/view/favoritebutton'
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

const commandItem = (state, send, command, data) => h('div.scroll_item spaced', [
  h('div.item command_title', [
    FavoriteButton(state, send, 'commands', command),
    h('h3', data.name),
    enabled_button(state, send, command, data),
  ]),
  h('pre', data.command),
  data.description ? h('div.item', data.description) : undefined,
  h('div.targets', [h('b', 'Valid targets:'), ` ${data.hosts.map(HostString).join(', ')}.`])
])

export default (state, send) => {
  const commands = Object.entries(FilterSearchResults(state, 'commands'))
  return h('div.scroll_container', [
    h('h2.panel_title', 'Host Data Commands'),
    SearchBar(send, 'commands'),
    h('div.scroll spaced', [
      ...commands.filter(v => state.favorites.commands && state.favorites.commands[v[0]]).map(v => commandItem(state, send, v[0], v[1])),
      ...commands.filter(v => !state.favorites.commands || !state.favorites.commands[v[0]]).map(v => commandItem(state, send, v[0], v[1]))
    ])
  ])
}