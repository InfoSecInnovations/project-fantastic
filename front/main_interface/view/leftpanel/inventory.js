import TopLevelFoldout from '@infosecinnovations/fantastic-front/view/toplevelfoldout'
import HasRole from '@infosecinnovations/fantastic-utils/hasrole'
import {h} from 'snabbdom/h'

const enabled_button = (state, send, inventory_item, data) => {
  if (data.mode == 'force') return h('div', 'Always enabled!')
  if (HasRole(state.user, data.role)) return state.inventory_status[inventory_item] == 'loading' ? 
  h('div.button disabled', 'Updating status...') :
  h('div.button', 
    {
      on: {
        click: e => {
          e.preventDefault()
          e.stopPropagation()
          send({type: 'enable_inventory', inventory_item, enabled: data.mode != 'enabled'})
        }
      }
    }, 
    data.mode == 'enabled' ? 'Enabled' : 'Disabled')
  return h('div', `${data.mode == 'enabled' ? 'Enabled' : 'Disabled'} (requires ${data.role} role to change)`)
}

export default (state, send) => h('div.scroll_container', [
  h('h2.panel_title', 'Inventory'),
  (state.inventory_categories && h('div.scroll', state.inventory_categories.map(c => h('div.scroll_item', [
    TopLevelFoldout(state, send, `category-header-${c}`, h('h3', c), [
      ...Object.values(state.inventory).filter(v => v.category == c).map(v => h('div.item', [
        h('h4', v.name),
        enabled_button(state, send, v.key, v)
      ])),
      h('div.item', [
        state.inventory_data && Object.values(state.inventory_data).some(v => v.hasOwnProperty(c)) ? h('div.button', {
          on: {click: e => send({type: 'view_inventory', category: c})}
        }, 'View inventory') : undefined,
        h('div.button', {
          on: {click: e => send({type: 'view_inventory_rules', category: c})}
        }, 'Rules')
      ])

    ]),
  ])))) || undefined
])