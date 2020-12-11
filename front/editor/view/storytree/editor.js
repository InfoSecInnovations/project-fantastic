import {h} from 'snabbdom/h'

export default (state, send) => Object.entries(state.editor.nodes).map(node => {
  const sliceIndex = node[1].key.lastIndexOf('/')
  const key = node[1].key.slice(sliceIndex + 1)
  const module = state.modules[node[1].key.slice(0, sliceIndex)]
  if (!module) return
  const data = module[node[1].type][key]
  return h('div.node', {
    attrs: { id: node[0] },
    class: {
      highlight: state.editor.selected == node[0]
    },
    style: {
      position: 'absolute',
      left: `${node[1].position.x}px`,
      top: `${node[1].position.y}px`
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
    h('div.node-label', data.name),
    h('div.node-button', {on: {click: e => send({type: 'editor_node_remove', id: node[0]})}}, 'X'),
    h('div.node-button handle', '➞')
  ])
})