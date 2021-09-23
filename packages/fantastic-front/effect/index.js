import ActionFollowup from './actionfollowup'
import GenerateQuery from './generatequery'
import Action from './action'

export default (state, action, send) => {
  if (action.type == 'init') {
    fetch('/module_info').then(res => res.json()).then(res => send({type: 'module_info', info: res}))
    window.onkeydown = e => {
      if (e.key === 'Shift') send({type: 'key', key: 'shift', value: true})
      if (e.key === 'Enter') send({type: 'key', key: 'enter', value: true})
    }
    window.onkeyup = e => {
      if (e.key === 'Shift') send({type: 'key', key: 'shift', value: false})
      if (e.key === 'Enter') send({type: 'key', key: 'enter', value: false})
    }
  } 
  if (action.type == 'perform_action') Action(state, action, send)
  if (action.type == 'action_followup') ActionFollowup(state, action, send)
  if (action.type == 'favorite') fetch(`/favorite?${GenerateQuery({data_type: action.data_type, data_key: action.data_key, remove: action.remove})}`, {method: 'POST'})
    .then(res => res.json())
    .then(res => send({type: 'toggle_favorite', data_type: res.data_type, data_key: res.data_key, remove: res.remove}))
  if (action.type == 'key') {
    if (action.key == 'enter' && action.value){
      if (state.action_input) {
        send({
          ...state.action_input,
          type: state.action_input.action_type,
          input: state.action_input.values
        })
        send({type: 'clear_action_input'}) 
      }
    }
  }
}