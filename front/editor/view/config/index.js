import {h} from 'snabbdom/h'
import InstalledModules from './installedmodules'
import AlwaysEnabled from './alwaysenabled'
import DefaultEnabled from './defaultenabled'
import MenuBar from './menubar'

export default (state, send) => h('div#config.content', {class: {hidden: state.mode != 'config'}}, [
  h('div#menu-bar.panel', MenuBar(state, send)),
  h('div#config-editor.panel', [
    h('div.column spaced', [
      h('h3', 'Content packages'),
      InstalledModules(state, send),
      AlwaysEnabled(state, send),
      DefaultEnabled(state, send)
    ]),
    h('div.column spaced', [
      h('h3', 'App'),
      h('div.column', [
        h('div.item', [
          h('div', 'Port'), 
          h('input', {
            attrs: {type: 'number' }, 
            props: {value: state.config.json.port},
            on: {
              input: e => send({type: 'config_port', value: parseInt(e.target.value)})
            }
          })
        ]),
        h('div.checkbox', [
          h('input', {
            attrs: {type: 'checkbox', id: 'child-process-checkbox'}, 
            props: {checked: state.config.json.use_child_process},
            on: {
              input: e => send({type: 'config_use_child_process', value: e.target.checked})
            }
          }),
          h('label', {for: 'child-process-checkbox'}, 'Use child process')
        ])
      ]),
      h('h3', 'Client'),
      h('div.item', [
        h('div', 'Node count warning'), 
        h('input', {
          attrs: {type: 'number'}, 
          props: {value: state.config.json.client.nodeCountWarning},
          on: {
            input: e => send({type: 'config_node_count_warning', value: parseInt(e.target.value)})
          }
        })
      ])
    ]),
    h('div.column spaced', [
      h('h3', 'Authentication'),
      h('div.item', [h('h4', 'Module'), h('div.mini-button', {}, 'Change')]),
      h('div', state.config.json.authentication.module),
      h('h4', 'Configuration'),
      h('div', 'TODO: specific auth module config')
    ])
  ])
])