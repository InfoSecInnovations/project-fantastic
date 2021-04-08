import ActionFollowup from './actionfollowup'
import GenerateQuery from './generatequery'

export default (state, action, send) => {
  if (action.type == 'init') fetch('/module_info').then(res => res.json()).then(res => send({type: 'module_info', info: res}))
  if (action.type == 'perform_action') fetch(`/actions?${GenerateQuery({action: action.action, node_id: action.node_id, connection: action.connection})}`, {method: 'POST'})
    .then(res => res.json())
    .then(res => {
      send({...action, type: 'action_result', result: res.result, hostname: action.host, date: res.date, filter: res.filter})
      const checkbox = document.getElementById(`${action.action}-foldout`)
      if (checkbox) checkbox.checked = true
    })
  if (action.type == 'action_followup') ActionFollowup(state, action, send)
  if (action.type == 'favorite') fetch(`/favorite?${GenerateQuery({data_type: action.data_type, data_key: action.data_key, remove: action.remove})}`, {method: 'POST'})
    .then(res => res.json())
    .then(res => send({type: 'toggle_favorite', data_type: res.data_type, data_key: res.data_key, remove: res.remove}))
}