import {h} from 'snabbdom/h'

export default (state, send) => Object.entries(state.editor.nodes).map(node => h('div.node', {
  attrs: { id: node[0] },
  class: {
    highlight: state.editor.selected == node[0]
  },
  style: {
    position: 'absolute'
  },
  on: {
    click: e => {
      send({type: 'editor_select', id: node[0]})
      e.stopPropagation()
    }
  },
  hook: {
    create: (_, vnode) => setTimeout(() => send({type: 'editor_node_el', el: vnode.elm})),
    destroy: vnode => setTimeout(() => send({type: 'editor_node_remove_el', id: node[0]}))
  },
  key: node[0]
}, [
  h('div.node-label', node[1].data.name),
  h('div.node-button', {on: {click: e => send({type: 'editor_node_remove', id: node[0]})}}, 'X'),
  h('div.node-button handle', '➞')
]))