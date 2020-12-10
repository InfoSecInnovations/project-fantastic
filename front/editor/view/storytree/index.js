import {h} from 'snabbdom/h'
import Sidebar from './sidebar'
import ModuleMenu from './modulemenu'
import Editor from './editor'
import Info from './info'

export default (state, send) => h('div#story-tree', [
  h('div#sidebar.panel', Sidebar(state, send)),
  h('div.column', [
    h('div#menu-bar.panel', [
      h('div.button', {on: {click: e => send({type: 'load_module_menu', enabled: true})}}, 'Load module'),
      h('div.button', {}, 'Load story tree'),
      h('div.button', {}, 'Save')
    ]),
    state.module_menu ? h('div#module-menu.panel', ModuleMenu(state, send)) :
    h('div#editor.graph', {
      hook: {create: (_, vnode) => setTimeout(() => send({type: 'editor_canvas', id: vnode.elm.getAttribute('id')}))},
      on: {
        drop: e => {
          e.preventDefault()
          const data = e.dataTransfer.getData('fantastic-data')
          if (data) {
            const json = JSON.parse(data)
            const rect = e.target.getBoundingClientRect()
            const id = state.editor.jsplumb.uuid()
            send({type: 'editor_node', x: e.clientX - rect.left, y: e.clientY - rect.top, node: json, id})
          }
        },
        dragover: e => {
          e.preventDefault()
          e.dataTransfer.dropEffect = 'move'
        },
        click: e => send({type: 'editor_select', id: null})
      }
    }, Editor(state, send))
  ]),
  h('div#info.panel column', {key: state.editor.selected || 'info'}, Info(state, send)), // setting a key prevents input from carrying over when changing selection
])