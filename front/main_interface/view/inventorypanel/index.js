import {h} from 'snabbdom/h'

export default (state, send) => h('div#inventory_viewer', [
  h('h2', `${state.view_inventory} Inventory`),
  // TODO: display inventory data grouped by host then category
  h('div.icon_button close', {on: {click: e => send({type: 'view_inventory', category: null})}}, h('div.fas fa-times fa-fw'))
])