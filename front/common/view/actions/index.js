const H = require('snabbdom/h').default
const HostString = require('../../util/hoststring')
const Result = require('./result')
const TimeAgo = require('../../util/timeago')

const actions = (state, send, node) => {
  if (!state.actions) return
  const actions = Object.entries(state.actions).filter(v => v[1].hosts.includes('none') || v[1].hosts.includes(node.access)) 
  return H('div.scroll_container',
    H('div.scroll spaced', !actions.length ? H('div.scroll_item', 'No actions compatible with this host') : actions.map(v => {
      const loading = state.action_results[node.hostname] && state.action_results[node.hostname][v[0]] && state.action_results[node.hostname][v[0]].status === 'loading'
      return H('div.scroll_item spaced', [
        H('div.item', [
          H('h3', v[1].name),
          H('div.button', 
            { 
              on: loading ? undefined : {click: [send, {type: 'perform_action', action: v[0], node_id: node.node_id, host: node.hostname}]},
              class: {loading}
            }, 
            loading ? 'Running...' : 'Run')
        ]),
        H('pre', v[1].commands.run),
        v[1].description ? v[1].description : undefined,
        H('div.targets', [H('b', 'Valid targets:'), ` ${v[1].hosts.map(HostString).join(', ')}.`]),
        state.action_results[node.hostname] && state.action_results[node.hostname][v[0]] && state.action_results[node.hostname][v[0]].result ? H('div.results', [
          H('div.followup', [
            `Results from ${TimeAgo(state.action_results[node.hostname][v[0]].date)}`, 
            H(`div.foldout fas fa-${state.action_results[node.hostname][v[0]].foldout ? 'chevron-down' : 'chevron-right'} fa-fw`, {
              on: {click: [send, {type: 'result_foldout', action: v[0], hostname: node.hostname, value: !state.action_results[node.hostname][v[0]].foldout}]}
            })
          ]),
          ...(state.action_results[node.hostname][v[0]].foldout ? state.action_results[node.hostname][v[0]].result
            .map((r, i) => Result(state, v[0], r, i, node.node_id, node.hostname, loading, send)) : [])
        ]) : undefined
      ])
    }))
  )
}

module.exports = actions