import {h} from 'snabbdom/h'

export default (state, send) => h('div.column', [
  h('div.item dropdown-parent', [
    h('h4', 'Installed'), 
    h('div.mini-button dropdown-trigger', {
      on: {click: e => send({type: 'dropdown_state', state: state.dropdownState == 'config_module' ? null : 'config_module'})}
    }, '+'),
    state.dropdownState == 'config_module' ? h('div.dropdown', (() => {
      const modules = Object.values(state.modules).filter(m => !state.config.json.assets.packages.includes(m.name))
      if (modules.length) return modules.map(m => h('div.option', {
        on: {click: e => send({type: 'config_add_module', module: m.name})}
      }, (m.info && m.info.name) || m.name))
      return h('div', {
        on: {click: e => send({type: 'dropdown_state', state: null})}
      }, 'No modules available')
    })()) : undefined
  ]),
  ...state.config.json.assets.packages.map(p => {
    const data = state.modules[p]
    return h('div.item', [
      h('div', (data && data.info && data.info.name) || p), 
      ...(data ? [] : [
        h('input', {
          attrs: { 
            id: `load-module-file-input-${p}`,
            type: 'file',
            nwdirectory: true
          },
          on: { change: e => {
            send({type: 'load_module', module: e.target.value})
            e.target.value = ''
          }},
          style: {display: 'none'}
        }),
        h('label.mini-button', {attrs: {title: 'Please locate missing module', for: `load-module-file-input-${p}`}}, '!')
      ]),
      h('div.mini-button', {
        attrs: {title: 'Remove'},
        on: {click: e => send({type: 'config_remove_module', module: p})}
      }, 'X')
    ])
  })
])