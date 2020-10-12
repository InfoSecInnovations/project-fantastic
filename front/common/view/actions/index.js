import {h} from 'snabbdom/h'
import SearchBar from '../searchbar'
import FilterSearchResults from '../../util/filtersearchresults'
import Action from './action'

const valid_host = (action, node) => action.hosts.includes('none') || action.hosts.includes(node.access)
const valid_target = (action, connection) => action.target === (connection ? 'connection' : 'host')

export default (state, send, node, connection) => {
  if (!state.actions) return
  const base_actions = FilterSearchResults(state, 'actions')
  const actions = Object.entries(base_actions).filter(v => valid_host(v[1], node) && valid_target(v[1], connection))
  return h('div.scroll_container', [
    SearchBar(send, 'actions'),
    connection && typeof state.selected.node !== 'undefined' ? h('div.button', {on: {click: [send, {type: 'connection', connection: null}]}}, 'View host actions') : undefined,
    h(
      'div.scroll spaced', { on: {scroll: e => e.target.style.setProperty("--actions-scroll-height", `calc(-${e.target.scrollTop}px - 6rem)`)}}, // there doesn't seem to be a good CSS solution to make a tooltip follow the scrollable area but display over it, so we need to set this variable
      !actions.length ? 
      h('div.scroll_item', 'No actions compatible with this host') : 
      actions.map(v => Action(state, send, node, connection, v[0], v[1]))
    )
  ])
}