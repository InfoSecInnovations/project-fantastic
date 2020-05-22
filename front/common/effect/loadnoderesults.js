const GenerateQuery = require('./generatequery')

const load_followup = (action, send, node, results, followups) => {
  const row = results.find(v => v.node_id === node.node_id && v.action === action && v.function === followups[followups.length - 1].followup)
  if (!row) return
  const result = JSON.parse(row.data)
  send({
    type: 'action_followup_result',
    action,
    result,
    hostname: node.hostname,
    date: row.date,
    followups
  })
  send({
    type: 'followup_foldout',
    action,
    hostname: node.hostname,
    date: row.date,
    followups,
    value: false
  })
  result.forEach((r, i) => {
    if (!r.followups) return
    Object.values(r.followups).forEach(f => load_followup(action, send, node, results, [...followups, {label: r.label, followup: f.function}]))
  })
}

const loadNodeResults = (nodes, send) => {
  fetch(`/results?${GenerateQuery({nodes: nodes.map(v => v.node_id)})}`)
  .then(res => res.json())
  .then(res => {
    res.filter(v => v.function === 'run').forEach(v => {
      const node = nodes.find(n => n.node_id === v.node_id)
      const result = JSON.parse(v.data)
      send({
        type: 'action_result',
        action: v.action,
        result,
        hostname: node.hostname,
        date: v.date
      })
      send({
        type: 'result_foldout',
        action: v.action,
        result,
        hostname: node.hostname,
        value: false
      })
      result.forEach((r, i) => {
        if (!r.followups) return
        Object.values(r.followups).forEach(f => load_followup(v.action, send, node, res, [{label: r.label, followup: f.function}]))
      })
    })
  })
}

module.exports = loadNodeResults