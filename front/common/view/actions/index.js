import {h} from 'snabbdom/h'
import HostString from '../../util/hoststring'
import Result from './result'
import TimeAgo from '../../util/timeago'
import SearchBar from '../searchbar'

const valid_host = (action, node) => action.hosts.includes('none') || action.hosts.includes(node.access)
const valid_target = (action, connection) => action.target === (connection ? 'connection' : 'host')

export default (state, send, node, connection) => {
  if (!state.actions) return
  const base_actions = state.flex_search.actions.query && state.flex_search.actions.results ? state.flex_search.actions.results.reduce((r, v) => ({...r, [v]: state.actions[v]}), {}) : state.actions
  const actions = Object.entries(base_actions).filter(v => valid_host(v[1], node) && valid_target(v[1], connection))
  return h('div.scroll_container', [
    SearchBar(send, 'actions'),
    connection && !connection.single ? h('div.button', {on: {click: [send, {type: 'connection', connection: undefined}]}}, 'Select a different connection') : undefined,
    h(
      'div.scroll spaced', 
      {
        on: {scroll: e => e.target.style.setProperty("--actions-scroll-height", `calc(-${e.target.scrollTop}px - 6rem)`)} // there doesn't seem to be a good CSS solution to make a tooltip follow the scrollable area but display over it, so we need to set this variable
      }, 
      !actions.length ? h('div.scroll_item', 'No actions compatible with this host') : actions.map(v => {
        const result_data = state.action_results[node.hostname] && state.action_results[node.hostname][v[0]]
        const loading = result_data && result_data.status === 'loading'
        return h('div.scroll_item spaced', [
          h('div.item', [
            h('h3', v[1].name),
            h('div.button', 
              { 
                on: loading ? undefined : {click: [send, {
                  type: 'perform_action', 
                  action: v[0], 
                  node_id: node.node_id, 
                  host: node.hostname, 
                  connection: connection && connection.connection_id
                }]},
                class: {disabled: loading}
              }, 
              loading ? 'Running...' : 'Run')
          ]),
          h('pre', v[1].commands.run),
          v[1].description ? v[1].description : undefined,
          h('div.targets', [h('b', 'Valid targets:'), ` ${v[1].hosts.map(HostString).join(', ')}.`]),
          result_data && result_data.result ? h('div.results', [
            h('div.followup', [
              `Results from ${TimeAgo(result_data.date)}`, 
              h(`div.foldout fas fa-${result_data.foldout ? 'chevron-down' : 'chevron-right'} fa-fw`, {
                on: {click: [send, {type: 'result_foldout', action: v[0], hostname: node.hostname, value: !result_data.foldout}]}
              })
            ]),
            ...(result_data.foldout ? result_data.result
              .map(r => Result(state, v[0], r, node.node_id, node.hostname, loading, result_data.filter, send)) : [])
          ]) : undefined
        ])
      })
    )
  ])
}