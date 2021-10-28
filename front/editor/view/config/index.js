import {h} from 'snabbdom/h'
import InstalledModules from './installedmodules'
import MenuBar from './menubar'

export default (state, send) => h('div#config.content', {class: {hidden: state.mode != 'config'}}, [
  h('div#menu-bar.panel', MenuBar(state, send)),
  h('div#config-editor.panel', [
    h('div.column spaced', [
      h('h3', 'Content packages'),
      InstalledModules(state, send),
      h('div.column', [
        h('div.item dropdown-parent', [
          h('h4', 'Always enabled'), 
          h('div.mini-button dropdown-trigger', {
            on: {click: e => send({type: 'dropdown_state', state: state.dropdownState == 'config_always_enabled' ? null : 'config_always_enabled'})}
          }, '+'),
          state.dropdownState == 'config_always_enabled' ? h('div.dropdown', (() => {
            const items = state.config.json.assets.packages.filter(p => state.modules[p]).map(p => state.modules[p]).map(m => [
              h('div', h('b', (m.info && m.info.name) || m.name)),
              ...(m.commands ? Object.entries(m.commands).map(c => h('div', c[1].name || c[0])) : [])  // TODO: filter by already enabled
            ]).flat() // TODO: filter out empty modules
            return items
          })()) : undefined
        ]),
        ...state.config.json.assets.force_commands.map(p => h('div.item', [h('div', p), h('div.mini-button', {
          attrs: {title: 'Remove'},
          on: {click: e => send({type: 'config_remove_always_enabled', item: p})}
        }, 'X')]))
      ]),
      h('div.column', [
        h('div.item', [h('h4', 'Enabled by default'), h('div.mini-button', {}, '+')]),
        ...state.config.json.assets.default_enable_commands.map(p => h('div.item', [h('div', p), h('div.mini-button', {
          attrs: {title: 'Remove'},
          on: {click: e => send({type: 'config_remove_default_enabled', item: p})}
        }, 'X')]))
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
              input: e => send({type: 'config_port', value: parseInt(e.target.value)})
            }
          })
        ]),
        h('div.item', [
          h('label', {for: 'child-process-checkbox'}, 'Use child process'), 
          h('input', {
            attrs: {type: 'checkbox', id: 'child-process-checkbox'}, 
            props: {checked: state.config.json.use_child_process},
            on: {
              input: e => send({type: 'config_use_child_process', value: e.target.checked})
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