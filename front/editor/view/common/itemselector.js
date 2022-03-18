import {h} from 'snabbdom/h'
import itemCollections from '../../util/itemcollections'

export default (state, send, label, triggerContent, dropdownState, itemType, clickAction, moduleList, filter) => {
  if (!moduleList) moduleList = Object.keys(state.modules)
  return h('div.item dropdown-parent', [
    label, 
    h('div.mini-button dropdown-trigger', {
      on: {click: e => send({type: 'dropdown_state', state: state.dropdownState == dropdownState ? null : dropdownState})}
    }, triggerContent),
    state.dropdownState == dropdownState ? h('div.dropdown', moduleList.filter(path => state.modules[path]).map(path => state.modules[path]).map(module => {
      let items = module[itemCollections[itemType]]
      if (!items) return undefined
      items = Object.entries(items)
      if (filter) items = items.filter(item => filter(item, module))
      if (!items.length) return undefined
      return [
        h('div', h('b', (module.info && module.info.name) || module.name)),
        ...items.map(item => {
          const fullPath = `${module.name}/${item[0]}`
          return h('div.option', {
            on: { click: e => {
              clickAction(fullPath)
              send({type: 'dropdown_state', state: null})
            }}
          }, item[1].name || fullPath)
        })
      ]
    })
    .flat()) : undefined
  ])
}