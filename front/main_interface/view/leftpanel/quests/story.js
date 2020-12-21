import {h} from 'snabbdom/h'

export default (state, send) => [
  h('h2.panel_title', 'Story Quests'),
  h('div.scroll spaced', Object.entries(state.stories).map(v => h('div', [
    h('h3', {on: {click: e => send({type: 'select_story', story: v[0]})}}, v[1].name)
  ])))
]