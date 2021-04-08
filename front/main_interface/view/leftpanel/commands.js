import {h} from 'snabbdom/h'
import HostString from '@infosecinnovations/fantastic-front/util/hoststring'
import SearchBar from '@infosecinnovations/fantastic-front/view/searchbar'
import FilterSearchResults from '@infosecinnovations/fantastic-front/util/filtersearchresults'
import FavoriteButton from '@infosecinnovations/fantastic-front/view/favoritebutton'
import TopLevelFoldout from '@infosecinnovations/fantastic-front/view/toplevelfoldout'
const HasRole = require('@infosecinnovations/fantastic-utils/hasrole')

const enabled_button = (state, send, command, data) => {
  if (data.mode == 'force') return h('div', 'Always enabled!')
  if (HasRole(state.user, data.role)) return state.command_status[command] == 'loading' ? 
  h('div.button disabled', 'Updating status...') :
  h('div.button', 
    {
      on: {
        click: e => {
          e.preventDefault()
          e.stopPropagation()
          send({type: 'enable_command', command, enabled: data.mode != 'enabled'})
        }
      }
    }, 
    data.mode == 'enabled' ? 'Enabled' : 'Disabled')
  return h('div', `${data.mode == 'enabled' ? 'Enabled' : 'Disabled'} (requires ${data.role} role to change)`)
}

const commandItem = (state, send, command, data) => {
  const id = `${command}-foldout`
  return h('div.scroll_item spaced', {
    key: id
  }, [
    h('input.auto_foldout', {
      attrs: {type: 'checkbox', id, checked: state.foldout_checkboxes[id]},
      on: {input: e => send({type: 'foldout_checkbox', id, value: e.target.checked})}
    }),
    h('div.item command_title', {
      hook: {
        insert: (vnode) => {
          if (command == state.selected_item) {
            vnode.elm.scrollIntoView()
            setTimeout(e => send({type: 'select_item', item: null}))
          } 
        }
      }
    }, [
      FavoriteButton(state, send, 'commands', command),
      h('label', {attrs: {for: id}}, h('div.item', [
        h('h3', data.name),
        enabled_button(state, send, command, data)
      ])),
    ]),
    h('div.foldout_child', [
      h('pre', data.command),
      data.description ? h('div.item', data.description) : undefined,
      h('div.targets', [h('b', 'Valid targets:'), ` ${data.hosts.map(HostString).join(', ')}.`])
    ])
  ])
} 

export default (state, send) => {
  const commands = Object.entries(FilterSearchResults(state, 'commands'))
  return h('div.scroll_container', [
    h('h2.panel_title', 'Host Data Commands'),
    SearchBar(send, 'commands'),
    h('div.scroll spaced',
      Object.entries(state.module_info).filter(v => commands.find(c => c[1].module == v[0])).map(v => {
        const id = `${v[0]}-commands-foldout`
        return TopLevelFoldout(state, send, id, h('div.module_header', v[1].name), [
          ...commands.filter(c => c[1].module == v[0] && state.favorites.commands && state.favorites.commands[c[0]]).map(c => commandItem(state, send, c[0], c[1])),
          ...commands.filter(c => c[1].module == v[0] && (!state.favorites.commands || !state.favorites.commands[c[0]])).map(c => commandItem(state, send, c[0], c[1]))
        ])
      })
    )
  ])
}