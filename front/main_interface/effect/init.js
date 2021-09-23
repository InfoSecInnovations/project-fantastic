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
  window.onresize = e => ResizeStory(state, send)
}