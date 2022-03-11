import {init} from 'snabbdom/init'
import { classModule } from 'snabbdom/modules/class'
import { propsModule } from 'snabbdom/modules/props'
import { styleModule } from 'snabbdom/modules/style'
import { attributesModule } from 'snabbdom/modules/attributes'
import { eventListenersModule } from 'snabbdom/modules/eventlisteners'
import View from './view'
import Update from './update'
import Effect from './effect'
import StoryTree from './defaults/storytree'
import Config from './defaults/config'
import Action from './defaults/action'
import TitleBar from './titlebar'
import Scan from './defaults/scan'

const patch = init([
  classModule,
  propsModule,
  styleModule,
  attributesModule,
  eventListenersModule,
])

let state = {
  storyTree: StoryTree(),
  config: {
    json: Config()
  },
  modules: {},
  action: Action(),
  scan: Scan(),
  newModuleData: {}
}
let vnode = document.body

const send = action => {
  state = Update(state, action)
  vnode = patch(vnode, View(state, send))
  document.title = TitleBar(state)
  Effect(state,action,send) 
}

const win = nw.Window.get()
win.maximize()
  
send({type:'init'})

window.state = state
