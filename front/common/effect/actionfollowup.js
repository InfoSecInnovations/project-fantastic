const GenerateQuery = require('./generatequery')

const fetch_followup = action => fetch(`/action_followup?${GenerateQuery({
  action: action.action, 
  function: action.followups[action.followups.length - 1].followup, 
  node_id: action.node_id, 
  label: action.followups[action.followups.length - 1].label
})}`, {method: 'POST', body: JSON.stringify(action.data)})

const actionFollowup = (state, action, send) => {
  fetch_followup(action)
    .then(res => res.json())
    .then(res => {
      send({...action, type: 'action_followup_result', result: res.result, hostname: action.host, date: res.date})
      if (action.followups && action.refresh && !res.result.length) { // TODO: maybe 0 results isn't always a good indication of needing to refresh?
        if (action.followups.length === 1) {
          send({
            ...action,
            type: 'perform_action',
            followup: action.followups[0],
          })
        }
        else {
          send({
            ...action,
            type: 'action_followup',
            followups: action.followups.slice(0, action.followups.length - 1),
            followup: action.followups[action.followups.length - 1]
          })
        }
      }
    })  

}

module.exports = actionFollowup