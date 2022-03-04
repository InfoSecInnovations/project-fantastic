import ActionTarget from '../../elements/actiontarget'

export default {
  title: 'Set Target Type', 
  description: "Actions can target hosts on the network, or specific connections belonging to a host.",
  view: (state, send) => ActionTarget(state, send)
}