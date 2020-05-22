const ToVNode = require('snabbdom/tovnode').default
const Snabbdom = require('snabbdom')
const Update = require('./update')
const View = require('./view')
const Effect = require('./effect')

const patch = Snabbdom.init([
  require('snabbdom/modules/class').default,
  require('snabbdom/modules/attributes').default,
  require('snabbdom/modules/style').default,
  require('snabbdom/modules/eventlisteners').default, ])

let state = { 
  action_results: {},
}
let vdom = ToVNode(document.body)

const send = action=> {
  state = Update(state, action)
  vdom = patch(vdom, View(state, send))
  Effect(state,action,send) 
}
  
send({type:'init'})

window.state = state
window.send = send