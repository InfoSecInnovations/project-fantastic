import GenerateQuery from './generatequery'

const load_followup = (action, send, node, results, followups) => {
  const row = results.find(v => v.node_id === node.node_id && v.action === action && v.function === followups[followups.length - 1].followup && v.label === followups[followups.length - 1].label)
  if (!row) return
  const result = JSON.parse(row.result)
  send({
    type: 'action_followup_result',
    action,
    result,
    hostname: node.hostname,
    date: row.date,
    filter: row.filter,
    followups
  })
  send({
    type: 'followup_foldout',
    action,
    hostname: node.hostname,
    followups,
    value: false
  })
  if (!result.error) result.forEach((r, i) => {
    if (!r.followups) return
    Object.values(r.followups).forEach(f => load_followup(action, send, node, results, [...followups, {label: r.label, followup: f.function}], ))
  })
}

export default (nodes, send) => {
  fetch(`/results?${GenerateQuery({nodes: nodes.map(v => v.node_id)})}`)
  .then(res => res.json())
  .then(res => {
    res.filter(v => v.function === 'run').forEach(v => {
      const node = nodes.find(n => n.node_id === v.node_id)
      const result = JSON.parse(v.result)
      send({
        type: 'action_result',
        action: v.action,
        result,
        hostname: node.hostname,
        date: v.date,
        filter: v.filter
      })
      send({
        type: 'result_foldout',
        action: v.action,
        result,
        hostname: node.hostname,
        value: false
      })
      if (!result.error) result.forEach((r, i) => {
        if (!r.followups) return
        Object.values(r.followups).forEach(f => load_followup(v.action, send, node, res, [{label: r.label, followup: f.function}]))
      })
    })
  })
  fetch(`/inventory_data?${GenerateQuery({nodes: nodes.map(v => v.node_id)})}`)
  .then(res => res.json())
  .then(res => send({type: 'inventory_data', data: res}))
}