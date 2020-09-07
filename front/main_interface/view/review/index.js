import {h} from 'snabbdom/h'
import NodeName from '../../../common/util/nodename'

export default (state, send) => {
  if (!state.review) return
  return h('div#review', h('div.panel', h('div.scroll_container', [
    h('h2', `Please check results from ${state.review.name}`),
    h('div.results scroll', state.review.results.map(v => {
      const node = state.nodes.find(n => n.node_id === v.node_id)
      return h('div.result scroll_item spaced', [
        h('div.header', [
          h('h3', node ? NodeName(node) : `Node ID: ${v.node_id}`), 
          h(`div.foldout fas fa-${state.review.foldouts[v.node_id] ? 'chevron-down' : 'chevron-right'}`, {on: {click: [send, {type: 'review_foldout', node_id: v.node_id, value: !state.review.foldouts[v.node_id]}]}})
        ]),
        ...(state.review.foldouts[v.node_id] ? v.result.result.map(r => h('div', [
          h('h4', r.label),
          ...(r.data ? r.data.map(d => h('div', d)) : [])
        ])) : [])
      ])
    })),
    h('div.buttons', [
      h('div.button', {on: {click: [send, {type: 'review', results: undefined}]}}, 'Everything looks OK'),
      h('div.button', {on: {click: [send, {type: 'review', results: undefined}]}}, "Something's not right")
    ])
  ])))
}