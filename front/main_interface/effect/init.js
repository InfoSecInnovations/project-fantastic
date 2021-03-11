import UserHistory from './userhistory'
import FetchScripts from '@infosecinnovations/fantastic-front/effect/fetchscripts'
import ResizeStory from './resizestory'

export default (state, send) => {
  window.onresize = e => send({type: 'render'})
  Promise.all([
    ...['actions', 'scans', 'quests', 'commands', 'stories'].map(v => FetchScripts(send, v)),
    fetch('/user')
    .then(res => res.json())
    .then(res => send({type: 'user', user: res})),
    fetch('/config')
    .then(res => res.json())
    .then(res => send({type: 'config', config: res}))
  ])
  .then(() => send({type: 'init_complete'}))
  UserHistory(send)
  window.onkeydown = e => {
    if (e.key === 'Shift') send({type: 'key', key: 'shift', value: true})
  }
  window.onkeyup = e => {
    if (e.key === 'Shift') send({type: 'key', key: 'shift', value: false})
  }
  window.onresize = e => ResizeStory(state, send)
}