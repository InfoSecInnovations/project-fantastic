import {h} from 'snabbdom/h'
import MultiAction from '@infosecinnovations/fantastic-front/view/actions/multiaction'

export default (state, send) => {
  if (!state.actions) return
  const nodes = state.selected.nodes.map(v => state.nodes[v])
  const actions = Object.entries(state.actions).filter(v => v[1].hosts.includes('none') || nodes.every(n => v[1].hosts.includes(n.access))).map(v => v[0])
  return h('div.scroll_container',
    h('div.scroll spaced', 
      !actions.length ? 
      h('div.scroll_item', 'No actions compatible with these hosts') : 
      actions.map(v => MultiAction(state, v, e => {
        send({type: 'open_viewer', nodes: state.selected.nodes})
        nodes.forEach(n => send({type: 'perform_action', action: v[0], node_id: n.node_id, host: n.hostname}))
      }))
    )
  )
}