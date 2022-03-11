import {h} from 'snabbdom/h'
import Path from 'path'

export default (state, send) => {
  const currentModule = state.modules[state.selectedModule]
  if (!currentModule) return
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
        h('div.column', [
          h('div.row top-aligned', [
            h('h3', 'Actions'),
            h('div.mini-button', {
              attrs: {title: 'New action'},
              on: {click: e => send({type: 'create_action'})}
            }, '+')
          ]),
          ...Object.entries(currentModule.actions).map(action => h('div.item', [
            h('div', action[1].name || action[0]), 
            h('div.mini-button', {
              attrs: {title: 'Edit'},
              on: { click: e => {
                send({type: 'load_action', action: action[1], filename: action[0]})
                send({type: 'mode', mode: 'action'})
              }}
            }, '✎'),
            h('div.mini-button', {
              attrs: {title: 'Delete'},
              on: {click: e => send({type: 'delete_action', filename: action[0], prompt: true})}
            }, 'X')
          ]))
        ]),
        h('div.column', [
          h('h3', 'Scans'),
          ...Object.entries(currentModule.scans).map(scan => h('div.item', [
            h('div', scan[1].name || scan[0]), 
            h('div.mini-button', {
              attrs: {title: 'Edit'},
              on: {
                click: e => {
                  send({type: 'load_scan', scan: scan[1], filename: scan[0]})
                  send({type: 'mode', mode: 'scan'})
                }
              }
            }, '✎'),
            h('div.mini-button', {
              attrs: {title: 'Delete'}
            }, 'X')
          ]))
        ]),
        h('div.column', [
          h('h3', 'Host Data Commands'),
          ...Object.entries(currentModule.commands).map(command => h('div.item', [
            h('div', command[1].name || command[0]), 
            h('div.mini-button', {attrs: {title: 'Edit'}}, '✎'),
            h('div.mini-button', {attrs: {title: 'Delete'}}, 'X')
          ]))
        ]),
        h('div.column', [
          h('h3', 'Story Trees'),
          ...Object.entries(currentModule.stories).map(story => h('div.item', [
            h('div', story[1].name || story[0]), 
            h('div.mini-button', {
              attrs: {title: 'Edit'},
              on: {click: e => {
                send({type: 'load_tree', path: Path.join(currentModule.path, 'stories', `${story[0]}.json`)})
                send({type: 'mode', mode: 'storytree'})
              }}
            }, '✎'),
            h('div.mini-button', {attrs: {title: 'Delete'}}, 'X')
          ]))
        ])
      ])
    ])
  ])
} 