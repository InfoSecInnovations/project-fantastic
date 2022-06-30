import ViewItems from './viewitems'
import {h} from 'snabbdom/h'
import ItemRules from './itemrules' 
import Rules from './rules'

export default (state, send) => h('div#inventory_viewer.scroll_container central_panel', [
  h('h2', `${state.view_inventory.category} Inventory`),
  state.view_inventory.mode == 'edit_item_rules' ? ItemRules(state, send) : 
  state.view_inventory.mode == 'rules' ? Rules(state, send) : ViewItems(state, send),
  h('div.icon_button close', {on: {click: e => {
    send({type: 'view_inventory', category: null})
    send({type: 'reset_current_inventory_rule'})
  }}}, h('div.fas fa-times fa-fw'))
])