import {h} from 'snabbdom/h'
import ItemFromKey from '../../util/itemfromkey'
import ModuleFromKey from '../../util/modulefromkey'

export default (state, send) => Object.entries(state.storyTree.json.nodeData).map(node => {
  const key = ItemFromKey(node[1].key)
  const module = ModuleFromKey(state, node[1].key)
  if (!module) return
  const data = module[node[1].type][key]
  return h('div.node', {
    attrs: { id: node[0] },
    class: {
      highlight: state.storyTree.selected == node[0]
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
      destroy: vnode => state.storyTree.jsplumb.unmanage(vnode.elm)
    },
    key: node[0]
  }, [
    h('div.node-label', data.name),
    h('div.node-button', {on: {click: e => send({type: 'editor_node_remove', id: node[0]})}}, 'X'),
    h('div.node-button handle', '➞')
  ])
})