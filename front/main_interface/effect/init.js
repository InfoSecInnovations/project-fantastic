const init = send => {
  window.onresize = e => send({type: 'render'})
  fetch('/commands')
  .then(res => res.json())
  .then(res => send({type: 'commands', commands: res}))
  fetch('/quests')
  .then(res => res.json())
  .then(res => send({type: 'quests', quests: res}))
  fetch('/tests')
  .then(res => res.json())
  .then(res => send({type: 'tests', tests: res}))
  fetch('/user')
  .then(res => res.json())
  .then(res => send({type: 'user', user: res}))
  fetch('/user_history')
  .then(res => res.json())
  .then(res => send({type: 'user_history', history: res}))
  window.onkeydown = e => {
    if (e.key === 'Shift') send({type: 'key', key: 'shift', value: true})
  }
  window.onkeyup = e => {
    if (e.key === 'Shift') send({type: 'key', key: 'shift', value: false})
  }
}

module.exports = init