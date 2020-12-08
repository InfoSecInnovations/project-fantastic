import {h} from 'snabbdom/h'
import StoryTree from './storytree'

const body = (state, send) => {
  if (!state.mode || state.mode == 'menu') return h('div#menu.column', [
    h('h1', 'Fantastic Editor'),
    h('div.button', {on: {click: e => send({type: 'mode', mode: 'storytree'})}}, 'Story Tree Editor')
  ])
  if (state.mode == 'storytree') return StoryTree(state, send)
}

export default (state, send) => h('body', body(state, send))