const ToVNode = require('snabbdom/tovnode').default
const Snabbdom = require('snabbdom')
const Update = require('./update')
const View = require('./view')
const Effect = require('./effect')
const ActionResults = require('../common/defaults/actionresults')
const Hovered = require('./defaults/hovered')

const patch = Snabbdom.init([
  require('snabbdom/modules/class').default,
  require('snabbdom/modules/attributes').default,
  require('snabbdom/modules/style').default,
  require('snabbdom/modules/eventlisteners').default, ])

let state = {
  search: {date: 15, show_external: true, connection_type: 'all', connection_state: []}, 
  tab: 'info', 
  selected: {}, 
  hovered: Hovered(), 
  action_results: ActionResults(),
  keys: {},
  child_tabs: []
}
let vdom = ToVNode(document.body)

const send = action=> {
  state = Update(state, action)
  vdom = patch(vdom, View(state, send))
  Effect(state,action,send) 
}
  
send({type:'init'})

window.state = state