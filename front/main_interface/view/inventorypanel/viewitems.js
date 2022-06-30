import StatusIcon from '@infosecinnovations/fantastic-front/view/statusicon'
import TopLevelFoldout from '@infosecinnovations/fantastic-front/view/toplevelfoldout'
import {h} from 'snabbdom/h'

export default (state, send) => h('div.scroll', Object.entries(state.inventory_data).map(([k, v]) => h('div.section', [
  TopLevelFoldout(
    state, 
    send, 
    `foldout-inventory-${state.view_inventory.category}-${k}`, 
    h('h3', k),
    h('div.section', v[state.view_inventory.category].map(v => h('div.item top-aligned', [
      h('div', Object.entries(v.data).map(([k, v]) => h('div', `${k}: ${v}`))),
      h('div', [
        h('div.button', {
          on: { click: e => send({type: 'inventory_panel_mode', mode: 'edit_item_rules', item: v.data}) }
        }, 'Edit Item Rules'),
        v.blocked ? h('div.item', [
          StatusIcon('failure'),
          h('div.failure', 'This item is not allowed under the current rules. Please either remove it from the host machine or create an exception.')
        ]) : undefined
      ])
    ])))
  )
])))