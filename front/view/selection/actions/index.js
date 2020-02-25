const H = require('snabbdom/h').default
const HostString = require('../../../util/hoststring')
const Result = require('./result')

const actions = (state, send, node) => {
  if (!state.actions) return
  const hostname = node.access === 'local' ? null : node.hostname
  return H('div.selection_panel', 
    H('div.scroll_container.section', [
      H('div.scroll', Object.entries(state.actions).filter(v => v[1].hosts.includes('none') || v[1].hosts.includes(node.access)).map(v => H('div.scroll_item', [ // TODO: filter by possibility to execute on this node
        H('div.item', [
          H('div.subtitle', v[1].name),
          H('div.button', 
            { on: {click: [send, {type: 'perform_action', action: v[0], hostname, host: node.hostname}]}}, 
            'Run')
        ]),
        v[1].description ? H('div.item', v[1].description) : undefined,
        H('div.targets', [H('b', 'Valid targets:'), ` ${v[1].hosts.map(HostString).join(', ')}.`]),
        state.action_results[node.hostname] && state.action_results[node.hostname][v[0]] ? H('div.results', [
          H('div.subtitle', 'Results'),
          ...state.action_results[node.hostname][v[0]].map(r => Result(v[0], r, hostname, send))
        ]) : undefined
      ])))
    ])
  )
}

module.exports = actions