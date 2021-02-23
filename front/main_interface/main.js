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

const patch = init([
  classModule,
  propsModule,
  styleModule,
  attributesModule,
  eventListenersModule,
])

let state = {
  flex_search: {actions: {}, scans: {}, commands: {}},
  search: {date: 15, show_external: true, connection_type: 'all', connection_state: []}, 
  connection_search: {},
  tab: 'info', 
  selected: {}, 
  hovered: Hovered(), 
  action_results: {},
  quest_results: QuestResults(),
  scan_results: ScanResults(),
  story_results: QuestResults(),
  scan_parameters: {},
  keys: {},
  child_tabs: [],
  command_status: {},
  story: {
    completed: {}
  },
  favorites: {}
}
let vnode = document.body

const send = action => {
  state = Update(state, action)
  vnode = patch(vnode, View(state, send))
  Effect(state,action,send) 
}
  
send({type:'init'})

window.state = state