import UserHistory from './userhistory'
import FetchScripts from '@infosecinnovations/fantastic-front/effect/fetchscripts'
import ResizeStory from './resizestory'

export default (state, send) => {
  window.onresize = e => send({type: 'render'})
  ;['actions', 'scans', 'quests', 'commands', 'stories'].forEach(v => FetchScripts(send, v)) // automatic semicolon insertion doesn't work on this line
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
  window.onresize = e => ResizeStory(state, send)
}