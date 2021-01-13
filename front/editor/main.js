import {init} from 'snabbdom/init'
import { classModule } from 'snabbdom/modules/class'
import { propsModule } from 'snabbdom/modules/props'
import { styleModule } from 'snabbdom/modules/style'
import { attributesModule } from 'snabbdom/modules/attributes'
import { eventListenersModule } from 'snabbdom/modules/eventlisteners'
import View from './view'
import Update from './update'
import Effect from './effect'
import QuestConfig from './defaults/questconfig'
const GenerateID = require('@infosecinnovations/fantastic-utils/generateid')

const run = async () => {
  const patch = init([
    classModule,
    propsModule,
    styleModule,
    attributesModule,
    eventListenersModule,
  ])
  
  let state = {
    editor: {
      nodes: {},
      config: QuestConfig(),
      questId: await GenerateID()
    },
    modules: {}
  }
  let vnode = document.body
  
  const send = action => {
    state = Update(state, action)
    vnode = patch(vnode, View(state, send))
    Effect(state,action,send) 
  }
  
  const win = nw.Window.get()
  win.maximize()
    
  send({type:'init'})
  
  window.state = state
}

run()
