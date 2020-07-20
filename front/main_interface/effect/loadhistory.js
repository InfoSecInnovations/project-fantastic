const loadHistory = send => {
  fetch('/quest_history')
  .then(res => res.json())
  .then(res => res.forEach(v => {
    send({type: 'quest_results', quest: v.quest, date: v.date, results: JSON.parse(v.results), select: false})
    send({type: 'quest_nodes', quest: v.quest, nodes: JSON.parse(v.rows)})
  }))
  fetch('/test_history')
  .then(res => res.json())
  .then(res => res.forEach(v => send({type: 'test_results', test: v.test, parameters: JSON.parse(v.parameters), date: v.date, results: JSON.parse(v.results), select: false})))
}

module.exports = loadHistory