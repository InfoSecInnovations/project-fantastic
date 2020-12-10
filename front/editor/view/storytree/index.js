import {h} from 'snabbdom/h'
import Sidebar from './sidebar'
import ModuleMenu from './modulemenu'
import Editor from './editor'

export default (state, send) => h('div#story-tree', [
  h('div#sidebar.panel column', Sidebar(state, send)),
  h('div#editor.graph', {
    hook: {create: (_, vnode) => setTimeout(() => send({type: 'editor_canvas', id: vnode.elm.getAttribute('id')}))},
    on: {
      drop: e => {
        e.preventDefault()
        const data = e.dataTransfer.getData('fantastic-data')
        if (data) {
          const json = JSON.parse(data)
          const rect = e.target.getBoundingClientRect()
          send({type: 'editor_node', x: e.clientX - rect.left, y: e.clientY - rect.top, node: json, id: state.editor.jsplumb.uuid()})
        }
      },
      dragover: e => {
        e.preventDefault()
        e.dataTransfer.dropEffect = 'move'
      }
    }
  }, Editor(state, send)),
  h('div#info.panel'),
  state.module_menu ? h('div#module-menu.panel', ModuleMenu(state, send)) : undefined
])