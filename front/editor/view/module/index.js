import {h} from 'snabbdom/h'
import Path from 'path'
import itemCollections from '../../util/itemcollections'

export default (state, send) => {
  const currentModule = state.modules[state.selectedModule]
  if (!currentModule) return
  const moduleItems = (state, send, itemType, label) => h('div.column', [
    h('div.row top-aligned', [
      h('h3', label),
      h('div.mini-button', {
        attrs: {title: `New ${itemType}`},
        on: {click: e => send({type: 'create_item', itemType})}
      }, '+')
    ]),
    ...Object.entries(currentModule[itemCollections[itemType]]).map(([filename, item]) => h('div.item', [
      h('div', item.name || filename), 
      h('div.mini-button', {
        attrs: {title: 'Edit'},
        on: { click: e => {
          send({type: 'set_current_item', itemType, filename})
        }}
      }, '✎'),
      h('div.mini-button', {
        attrs: {title: 'Delete'},
        on: {click: e => send({type: 'delete_item', itemType, filename, prompt: true})}
      }, 'X')
    ]))
  ])
  return h('div#module.content', {class: {hidden: state.mode != 'module'}}, [
    h('div.menu-bar panel', [h('h2', 'Module Editor'), h('h2', (currentModule.info && currentModule.info.name) || currentModule.name)]),
    h('div#module-editor.panel editor-scroll', [
      h('div.row', [
        h('label.label', {
          attrs: { for: 'module-name-input' }
        }, 'Display Name'),
        h('input', {
          attrs: { id: 'module-name-input' },
          props: { value: (currentModule.info && currentModule.info.name) || '' },
          on: {
            input: e => send({type: 'set_module_display_name', value: e.target.value}),
            change: e => send({type: 'save_module_info'})
          }
        })
      ]),
      h('div.row', [
        h('label.label', {
          attrs: { for: 'module-package-name-input' }
        }, 'NPM Package Name'),
        h('input', {
          attrs: { id: 'module-package-name-input' },
          props: { value: currentModule.name },
          on: {
            input: e => send({type: 'set_module_package_name', value: e.target.value}),
            change: e => send({type: 'update_module_name'})
          }
        })
      ]),
      h('div.module-items', [
        moduleItems(state, send, 'action', 'Actions'),
        moduleItems(state, send, 'scan', 'Scans'),
        moduleItems(state, send, 'command', 'Host Data Commands'),
        moduleItems(state, send, 'storyTree', 'Story Trees')
      ])
    ])
  ])
} 