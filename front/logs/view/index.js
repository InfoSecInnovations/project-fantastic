import Search from './search'
import Logs from './logs'
import {h} from 'snabbdom/h'

export default (state, send) => h('body',
  h('div#container',
    h('div#md_container', [
      h('h1', 'Logs'),
      state.actions && state.quests && state.tests && state.logs ? h('div#logs', [
        Search(state, send),
        Logs(state, send)
      ]) : undefined
    ])
  )
)