const compareEvent = (a, b) => {
  if (!a || !b) return false
  if (a.event_type != b.event_type) return false
  if (a.event_type == 'quest') return a.quest === b.quest
  if (a.event_type == 'scan') {
    if (a.scan !== b.scan) return false
    const a_parameters = JSON.parse(a.parameters)
    const b_parameters = JSON.parse(b.parameters)
    return (a_parameters == null && b_parameters == null) || Object.entries(a_parameters).every(v => b_parameters[v[0]] === v[1])
  }
  if (a.event_type == 'command') return a.command === b.command && a.status === b.status
  return false
}

module.exports = compareEvent