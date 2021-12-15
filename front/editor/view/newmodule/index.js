import {h} from 'snabbdom/h'

export default (state, send) => h('div#new-module.content', {class: {hidden: state.mode != 'new_module'}}, [
  h('div.menu-bar panel', [h('h2', 'New Module')]),
  h('div#new-module-editor.panel', [
    h('div.row', [
      h('label.label', {attrs: {for: 'new-module-name'}}, 'npm package Name'),
      h('input', {
        on: {input: e => send({type: 'module_data_name', value: e.target.value})},
        attrs: {
          id: 'new-module-name', 
          value: state.newModuleData.name || ''
        }
      })
    ]),
    h('div.row', [
      h('label.label', {attrs: {for: 'new-module-org'}}, 'npm organization (optional)'),
      h('input', {
        on: {input: e => send({type: 'module_data_org', value: e.target.value})},
        attrs: {
          id: 'new-module-org', 
          value: state.newModuleData.org || ''
        }
      })
    ]),
    h('div.row', [
      h('label.label', {attrs: {for: 'new-module-display-name'}}, 'Display Name (optional)'),
      h('input', {
        on: {input: e => send({type: 'module_data_display_name', value: e.target.value})},
        attrs: {
          id: 'new-module-display-name', 
          value: state.newModuleData.displayName || ''
        }
      })
    ]),
    h('input', {
      attrs: { 
        id: 'create-module-file-input',
        type: 'file',
        nwdirectory: true
      },
      on: { change: e => {
        send({type: 'create_new_module', path: e.target.value})
        e.target.value = ''
      }},
      style: {display: 'none'}
    }),
    h('label.button', {attrs: {for: 'create-module-file-input'}}, 'Create Module')
  ])
])