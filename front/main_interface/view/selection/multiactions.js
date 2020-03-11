const H = require('snabbdom/h').default
const HostString = require('../../../common/util/hoststring')

const multiActions = (state, send) => {
  if (!state.actions) return
  const nodes = state.selected.nodes.map(v => state.nodes[v])
  const actions = Object.entries(state.actions).filter(v => v[1].hosts.includes('none') || nodes.every(n => v[1].hosts.includes(n.access)))
  return H('div.selection_panel', 
    H('div.scroll_container.section',
      H('div.scroll', !actions.length ? H('div.scroll_item', 'No actions compatible with these hosts') : actions.map(v => H('div.scroll_item', [
        H('div.item', [
          H('div.subtitle', v[1].name),
          H('div.button', 
            { 
              on: {click: [
                [send, {type: 'open_viewer', nodes: state.selected.nodes}],
                () => nodes.forEach(n => send({type: 'perform_action', action: v[0], node_id: n.node_id, host: n.hostname}))
              ]},
            }, 
            'Run')
        ]),
        v[1].description ? H('div.item', v[1].description) : undefined,
        H('div.targets', [H('b', 'Valid targets:'), ` ${v[1].hosts.map(HostString).join(', ')}.`]),
      ])))
    )
  )
}

module.exports = multiActions