import {init} from 'snabbdom/init'
import { classModule } from 'snabbdom/modules/class'
import { propsModule } from 'snabbdom/modules/props'
import { styleModule } from 'snabbdom/modules/style'
import { eventListenersModule } from 'snabbdom/modules/eventlisteners'
import View from './view'
import Update from './update'
import Effect from './effect'

const patch = init([
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
])

let state = {
  search: {event_types: {}},
  page: 0
}
let vnode = document.body

const send = action=> {
  state = Update(state, action)
  vnode = patch(vnode, View(state, send))
  Effect(state,action,send) 
}
  
send({type:'init'})

window.state = state