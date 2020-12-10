import {h} from 'snabbdom/h'

export default (state, send) => Object.entries(state.editor.nodes).map(e => h('div.node', {
  attrs: { id: e[0] },
  style: {
    position: 'absolute'
  },
  hook: {create: (_, vnode) => setTimeout(() => send({type: 'editor_node_el', el: vnode.elm}))},
}, [
  h('div.node-label', e[1].value.name),
  h('div.node-button', 'X'),
  h('div.node-button handle', '➞')
]))