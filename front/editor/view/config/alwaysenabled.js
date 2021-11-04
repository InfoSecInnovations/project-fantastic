import {h} from 'snabbdom/h'

export default (state, send) => h('div.column', [
  h('div.item dropdown-parent', [
    h('h4', 'Always enabled'), 
    h('div.mini-button dropdown-trigger', {
      on: {click: e => send({type: 'dropdown_state', state: state.dropdownState == 'config_always_enabled' ? null : 'config_always_enabled'})}
    }, '+'),
    state.dropdownState == 'config_always_enabled' ? h('div.dropdown', state.config.json.assets.packages.filter(p => state.modules[p]).map(p => state.modules[p]).map(m => [
      h('div', h('b', (m.info && m.info.name) || m.name)),
      ...(m.commands ? Object.entries(m.commands)
      .filter(c => !state.config.json.assets.force_commands.includes(`${m.name}/${c[0]}`)) : [])  // filter out already enabled
      .map(c => {
        const fullpath = `${m.name}/${c[0]}`
        return h('div', {
          on: { click: e => send({type: 'config_always_enable', command: fullpath})}
        }, c[1].name || fullpath)
      })
    ])
    .filter(group => group.length > 1) // if there's only one item it's the title and we should ignore this package
    .flat()) : undefined
  ]),
  ...state.config.json.assets.force_commands.map(c => h('div.item', [
    h('div', (() => {
      const separator = c.lastIndexOf('/')
      const module = c.substring(0, separator)
      const item = c.substring(separator + 1)
      const moduleData = state.modules[module]
      const itemData = moduleData && moduleData.commands && moduleData.commands[item]
      return `${moduleData ? (moduleData.info && moduleData.info.name) || moduleData.name : module} - ${(itemData && itemData.name) || item}`
    })()), 
    h('div.mini-button', {
      attrs: {title: 'Remove'},
      on: {click: e => send({type: 'config_remove_always_enabled', command: c})}
    }, 'X')
  ]))
])