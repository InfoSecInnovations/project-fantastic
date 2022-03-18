import {h} from 'snabbdom/h'
import ItemSelector from '../common/itemselector'

export default (state, send, commands, label, dropdownState, addAction, removeAction) => h('div.column', [
  ItemSelector(state, send, label, dropdownState, 'command', addAction, state.config.json.assets.packages, (command, module) => !commands.includes(`${module.name}/${command[0]}`)),
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
      on: {click: e => send({type: removeAction, fullPath: c})}
    }, 'X')
  ]))
])