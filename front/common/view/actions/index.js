import {h} from 'snabbdom/h'
import HostString from '../../util/hoststring'
import Result from './result'
import TimeAgo from '../../util/timeago'

export default (state, send, node) => {
  if (!state.actions) return
  const actions = Object.entries(state.actions).filter(v => v[1].hosts.includes('none') || v[1].hosts.includes(node.access)) 
  return h('div.scroll_container',
    h('div.scroll spaced', !actions.length ? h('div.scroll_item', 'No actions compatible with this host') : actions.map(v => {
      const loading = state.action_results[node.hostname] && state.action_results[node.hostname][v[0]] && state.action_results[node.hostname][v[0]].status === 'loading'
      return h('div.scroll_item spaced', [
        h('div.item', [
          h('h3', v[1].name),
          h('div.button', 
            { 
              on: loading ? undefined : {click: [send, {type: 'perform_action', action: v[0], node_id: node.node_id, host: node.hostname}]},
              class: {disabled: loading}
            }, 
            loading ? 'Running...' : 'Run')
        ]),
        h('pre', v[1].commands.run),
        v[1].description ? v[1].description : undefined,
        h('div.targets', [h('b', 'Valid targets:'), ` ${v[1].hosts.map(HostString).join(', ')}.`]),
        state.action_results[node.hostname] && state.action_results[node.hostname][v[0]] && state.action_results[node.hostname][v[0]].result ? h('div.results', [
          h('div.followup', [
            `Results from ${TimeAgo(state.action_results[node.hostname][v[0]].date)}`, 
            h(`div.foldout fas fa-${state.action_results[node.hostname][v[0]].foldout ? 'chevron-down' : 'chevron-right'} fa-fw`, {
              on: {click: [send, {type: 'result_foldout', action: v[0], hostname: node.hostname, value: !state.action_results[node.hostname][v[0]].foldout}]}
            })
          ]),
          ...(state.action_results[node.hostname][v[0]].foldout ? state.action_results[node.hostname][v[0]].result
            .map(r => Result(state, v[0], r, node.node_id, node.hostname, loading, send)) : [])
        ]) : undefined
      ])
    }))
  )
}