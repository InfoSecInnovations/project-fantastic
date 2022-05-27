import {init} from 'snabbdom/init'
import { classModule } from 'snabbdom/modules/class'
import { propsModule } from 'snabbdom/modules/props'
import { styleModule } from 'snabbdom/modules/style'
import { attributesModule } from 'snabbdom/modules/attributes'
import { eventListenersModule } from 'snabbdom/modules/eventlisteners'
import View from './view'
import Update from './update'
import Effect from './effect'
import QuestResults from './defaults/questresults'
import ScanResults from './defaults/scanresults'
import Hovered from './defaults/hovered'
import Search from './defaults/search'

const patch = init([
  classModule,
  propsModule,
  styleModule,
  attributesModule,
  eventListenersModule,
])

let state = {
  flex_search: {actions: {}, scans: {}, commands: {}, inventory: {}},
  search: Search(), 
  connection_search: {},
  tab: 'info', 
  selected: {}, 
  hovered: Hovered(), 
  action_results: {},
  quest_results: QuestResults(),
  scan_results: ScanResults(),
  story_results: QuestResults(),
  inventory_data: {},
  scan_parameters: {},
  keys: {},
  child_tabs: [],
  command_status: {},
  inventory_status: {},
  story: {
    completed: {}
  },
  favorites: {},
  foldout_checkboxes: {}
}
let vnode = document.body

const send = action => {
  state = Update(state, action)
  vnode = patch(vnode, View(state, send))
  Effect(state,action,send) 
}
  
send({type:'init'})

window.state = state
window.send = action => send({...action, from_other: true})