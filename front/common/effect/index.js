const ActionFollowup = require('./actionfollowup')
const GenerateQuery = require('./generatequery')

const effect = (state, action, send) => {
  if (action.type == 'perform_action') fetch(`/actions?${GenerateQuery({action: action.action, node_id: action.node_id})}`, {method: 'POST'})
    .then(res => res.json())
    .then(res => send({...action, type: 'action_result', result: res.result, hostname: action.host, date: res.date}))
  if (action.type == 'action_followup') ActionFollowup(state, action, send)
}

module.exports = effect