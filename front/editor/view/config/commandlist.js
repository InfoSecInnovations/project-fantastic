import {h} from 'snabbdom/h'

export default (state, send, commands, label, dropdownState, addAction, removeAction) => h('div.column', [
  h('div.item dropdown-parent', [
    h('h4', label), 
    h('div.mini-button dropdown-trigger', {
      on: {click: e => send({type: 'dropdown_state', state: state.dropdownState == dropdownState ? null : dropdownState})}
    }, '+'),
    state.dropdownState == dropdownState ? h('div.dropdown', state.config.json.assets.packages.filter(p => state.modules[p]).map(p => state.modules[p]).map(m => [
      h('div', h('b', (m.info && m.info.name) || m.name)),
      ...(m.commands ? Object.entries(m.commands)
      .filter(c => !commands.includes(`${m.name}/${c[0]}`)) : [])  // filter out already enabled
      .map(c => {
        const fullpath = `${m.name}/${c[0]}`
        return h('div.option', {
          on: { click: e => send({type: addAction, command: fullpath})}
        }, c[1].name || fullpath)
      })
    ])
    .filter(group => group.length > 1) // if there's only one item it's the title and we should ignore this package
    .flat()) : undefined
  ]),
  ...commands.map(c => h('div.item', [
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
      on: {click: e => send({type: removeAction, command: c})}
    }, 'X')
  ]))
])