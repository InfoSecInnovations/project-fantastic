const ToVNode = require('snabbdom/tovnode').default
const Snabbdom = require('snabbdom')
const H = require('snabbdom/h').default
const States = {
  2: 'Listen',
  3: 'SynSent',
  5: 'Established',
  8: 'CloseWait',
  11: 'TimeWait',
  100: 'Bound'
}

const patch = Snabbdom.init([
  require('snabbdom/modules/class').default,
  require('snabbdom/modules/attributes').default,
  require('snabbdom/modules/style').default,
  require('snabbdom/modules/eventlisteners').default, ])

let state = {}
let vdom = ToVNode(document.body)

const update = (state, action) => {
  if (action.type == 'nodes') state.nodes = action.nodes
  
  return state
}

const view = (state, send) => 
  H('body', [
    H('h1', 'Network Viewer'),
    ...(state.nodes ? state.nodes.map((v, i) => States[v.State] == 'Established' ? H('div.node', [
      H('p', `Local Address: ${v.LocalAddress}`),
      H('p', `Local Port: ${v.LocalPort}`),
      H('p', `Remote Address: ${v.RemoteAddress}`),
      H('p', `Remote Port: ${v.RemotePort}`),
      H('p', `State: ${States[v.State]}`)
    ]) : undefined) : [])
  ])

const effect = (state, action, send) => {
  if (action.type == 'init') {
    fetch('/nodes').then(res => res.json()).then(res => send({type: 'nodes', nodes: res}))
  }
}

const send = action=>setTimeout(()=>{
  state = update(state,action)
  vdom = patch(vdom,view(state,send))
  effect(state,action,send) })
  
send({type:'init'})

window.state = state