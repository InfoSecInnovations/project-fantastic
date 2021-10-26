import {h} from 'snabbdom/h'
import MenuBar from './menubar'

export default (state, send) => h('div#config.content', {class: {hidden: state.mode != 'config'}}, [
  h('div#menu-bar.panel', MenuBar(state, send)),
  h('div#config-editor.panel', [
    h('div.column spaced', [
      h('h3', 'Content packages'),
      h('div.column', [
        h('div.item', [h('h4', 'Installed'), h('div.mini-button', {}, '+')]),
        ...state.config.json.assets.packages.map(p => h('div.item', [h('div', p), h('div.mini-button', {}, 'X')]))
      ] ),
      h('div.column', [
        h('div.item', [h('h4', 'Always enabled'), h('div.mini-button', {}, '+')]),
        ...state.config.json.assets.force_commands.map(p => h('div.item', [h('div', p), h('div.mini-button', {}, 'X')]))
      ]),
      h('div.column', [
        h('div.item', [h('h4', 'Enabled by default'), h('div.mini-button', {}, '+')]),
        ...state.config.json.assets.default_enable_commands.map(p => h('div.item', [h('div', p), h('div.mini-button', {}, 'X')]))
      ])
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
              input: e => send({type: 'port', value: e.target.value})
            }
          })
        ]),
        h('div.item', [
          h('label', {for: 'child-process-checkbox'}, 'Use child process'), 
          h('input', {
            attrs: {type: 'checkbox', id: 'child-process-checkbox'}, 
            props: {checked: state.config.json.use_child_process},
            on: {
              input: e => send({type: 'use_child_process', value: e.target.value})
            }
          })
        ])
      ]),
      h('h3', 'Client'),
      h('div.item', [
        h('div', 'Node count warning'), 
        h('input', {
          attrs: {type: 'number'}, 
          props: {value: state.config.json.client.nodeCountWarning},
          on: {
            input: e => send({type: 'node_count_warning', value: e.target.value})
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