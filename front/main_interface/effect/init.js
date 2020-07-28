import UserHistory from './userhistory'
const FetchScripts = require('../../common/effect/fetchscripts')

export default send => {
  window.onresize = e => send({type: 'render'})
  ;['actions', 'tests', 'quests', 'commands'].forEach(v => FetchScripts(send, v)) // automatic semicolon insertion doesn't work on this line
  fetch('/user')
  .then(res => res.json())
  .then(res => send({type: 'user', user: res}))
  UserHistory(send)
  window.onkeydown = e => {
    if (e.key === 'Shift') send({type: 'key', key: 'shift', value: true})
  }
  window.onkeyup = e => {
    if (e.key === 'Shift') send({type: 'key', key: 'shift', value: false})
  }
}