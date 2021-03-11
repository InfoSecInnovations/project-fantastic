import {h} from 'snabbdom/h'

export default (state, send) => {
  if (!state.node_warning) return
  return h('div.blur', h('div.dialog', [
    h('div.item', `Your current search found ${state.node_warning.length} hosts. It is recommended you refine your filtering to reduce the number of results.`),
    h('div.dialog_buttons', [
      h('div.button', {on: {click: e => {
        send({type: 'node_warning', nodes: null})
        send({type: 'nodes', nodes: []})
      }}}, 'OK'),
      h('div.button', {on: {click: e => {
        send({type: 'nodes', nodes: state.node_warning})
        send({type: 'node_warning', nodes: null})
      }}}, 'Load hosts anyway!')
    ])
  ]))
}