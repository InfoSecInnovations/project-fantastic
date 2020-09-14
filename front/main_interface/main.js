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
import TestResults from './defaults/testresults'
import Hovered from './defaults/hovered'

const patch = init([
  classModule,
  propsModule,
  styleModule,
  attributesModule,
  eventListenersModule,
])

let state = {
  flex_search: {actions: {}, tests: {}, commands: {}},
  search: {date: 15, show_external: true, connection_type: 'all', connection_state: []}, 
  tab: 'info', 
  selected: {}, 
  hovered: Hovered(), 
  action_results: {},
  quest_results: QuestResults(),
  test_results: TestResults(),
  test_parameters: {},
  keys: {},
  child_tabs: [],
  command_status: {}
}
let vnode = document.body

const send = action => {
  state = Update(state, action)
  vnode = patch(vnode, View(state, send))
  Effect(state,action,send) 
}
  
send({type:'init'})

window.state = state