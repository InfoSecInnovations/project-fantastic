const GenerateQuery = require('./generatequery')

const fetch_followup = action => fetch(`/action_followup?${GenerateQuery({
  action: action.action, 
  function: action.followups[action.followups.length - 1].followup, 
  node_id: action.node_id, 
  index: action.followups[action.followups.length - 1].index
})}`, {method: 'POST', body: JSON.stringify(action.data)})

const actionFollowup = (state, action, send) => {
  fetch_followup(action)
    .then(res => res.json())
    .then(res => send({...action, type: 'action_followup_result', result: res.result, hostname: action.host, date: res.date}))  
    // TODO: re-implement refreshing parent results
}

module.exports = actionFollowup