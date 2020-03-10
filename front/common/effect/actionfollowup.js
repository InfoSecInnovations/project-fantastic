const fetch_followup = action => fetch(`/action_followup?action=${action.action}&function=${action.function}&node_id=${action.node_id}&key=${action.id}`, {method: 'POST', body: JSON.stringify(action.data)})

const actionFollowup = (state, action, send) => {
  fetch_followup(action)
    .then(res => res.json())
    .then(res => send({...action, type: 'action_followup_result', result: res, hostname: action.host}))  
    .then(() => {
      if (!action.refresh) return
      if (action.keys.length) {
        let action_result = state.action_results.data[action.host][action.action]
        for (let i = 0; i < action.keys.length - 1; i++) {
          const keys = action.keys[i]
          action_result = action_result[keys.id][keys.function]
        }
        const id = action.keys[action.keys.length - 1].id
        const func = action.keys[action.keys.length - 1].function
        action_result = action_result[id]
        const result_value = action_result.value.find(v => v.click && v.click.function === func)
        const prev_action = {
          ...action,
          keys: action.keys.slice(0, action.keys.length - 1),
          function: func,
          id,
          data: result_value.click.data
        }
        send({type: 'action_followup', ...prev_action, refresh: false})
      }
      else send({...action, type: 'perform_action'})
    })
}

module.exports = actionFollowup