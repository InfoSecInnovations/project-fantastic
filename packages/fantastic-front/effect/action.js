import GenerateQuery from './generatequery'

export default (state, action, send) => {
  fetch(`/actions?${GenerateQuery({action: action.action, node_id: action.node_id, connection: action.connection})}`, {method: 'POST', body: action.input && JSON.stringify(action.input)})
  .then(res => res.json())
  .then(res => {
    send({...action, type: 'action_result', result: res.result, hostname: action.host, date: res.date, filter: res.filter})
    const checkbox = document.getElementById(`${action.action}-foldout`)
    if (checkbox) checkbox.checked = true
  })
}