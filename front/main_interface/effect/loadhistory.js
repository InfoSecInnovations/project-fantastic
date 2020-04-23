const loadHistory = send => {
  fetch('/quest_history')
  .then(res => res.json())
  .then(res => res.forEach(v => send({type: 'quest_results', quest: v.quest, date: v.date, results: JSON.parse(v.results), select: false})))
  fetch('/test_history')
  .then(res => res.json())
  .then(res => res.forEach(v => send({type: 'test_results', test: v.test, parameters: JSON.parse(v.parameters), date: v.date, results: JSON.parse(v.results), select: false})))
}

module.exports = loadHistory