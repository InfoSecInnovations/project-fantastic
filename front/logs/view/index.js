import Search from './search'
import Logs from './logs'
import {h} from 'snabbdom/h'

export default (state, send) => h('body',
  h('div#container.panel', [
    h('h1', 'Logs'),
    ...(state.actions && state.quests && state.scans && state.logs ? [
      Search(state, send),
      Logs(state, send)
    ] : [
      h('div', 'Loading data...')
    ])
  ])
)