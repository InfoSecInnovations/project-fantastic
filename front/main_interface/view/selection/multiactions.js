import {h} from 'snabbdom/h'
const HostString = require('../../../common/util/hoststring')

export default (state, send) => {
  if (!state.actions) return
  const nodes = state.selected.nodes.map(v => state.nodes[v])
  const actions = Object.entries(state.actions).filter(v => v[1].hosts.includes('none') || nodes.every(n => v[1].hosts.includes(n.access)))
  return h('div.scroll_container',
    h('div.scroll spaced', !actions.length ? h('div.scroll_item', 'No actions compatible with these hosts') : actions.map(v => h('div.scroll_item spaced', [
      h('div.item', [
        h('h3', v[1].name),
        h('div.button', 
          { 
            on: {click: [
              [send, {type: 'open_viewer', nodes: state.selected.nodes}],
              () => nodes.forEach(n => send({type: 'perform_action', action: v[0], node_id: n.node_id, host: n.hostname}))
            ]},
          }, 
          'Run')
      ]),
      v[1].description ? h('div.item', v[1].description) : undefined,
      h('div.targets', [h('b', 'Valid targets:'), ` ${v[1].hosts.map(HostString).join(', ')}.`]),
    ])))
  )
}