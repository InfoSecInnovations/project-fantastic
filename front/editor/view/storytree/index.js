import {h} from 'snabbdom/h'
import Sidebar from './sidebar'
import ModuleMenu from './modulemenu'

export default (state, send) => h('div#story-tree', [
  h('div#sidebar.panel column', Sidebar(state, send)),
  h('div#editor.graph', {
    hook: {create: (_, vnode) => setTimeout(() => send({type: 'editor_canvas', id: vnode.elm.getAttribute('id')}))},
  }),
  h('div#info.panel'),
  state.module_menu ? h('div#module-menu.panel', ModuleMenu(state, send)) : undefined
])