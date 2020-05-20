const GenerateQuery = require('./generatequery')

const fetch_followup = action => fetch(`/action_followup?${GenerateQuery({
  action: action.action, 
  function: action.followups[action.followups.length - 1].followup, 
  node_id: action.node_id, 
  key: action.id
})}`, {method: 'POST', body: JSON.stringify(action.data)})

const actionFollowup = (state, action, send) => {
  fetch_followup(action)
    .then(res => res.json())
    .then(res => send({...action, type: 'action_followup_result', result: res.result, hostname: action.host, date: res.date}))  
    /*.then(() => { TODO: re-implement refreshing parent results
      if (!action.refresh) return
      if (action.followups.length > 1) { // refresh the results one tier above this one because executing a sub action may have modified them
        const prev_action = {
          ...action,
          followups: action.followups.slice(0, action.followups.length - 1),
          data: result_value.click.data
        }
        send({type: 'action_followup', ...prev_action, refresh: false})
      }
      else send({...action, type: 'perform_action'})
    })*/
}

module.exports = actionFollowup