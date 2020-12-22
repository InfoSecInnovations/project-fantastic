import {h} from 'snabbdom/h'

export default (state, send) => [
  h('h2.panel_title', 'Story Quests'),
  h('div.scroll', Object.entries(state.stories).map(v => h('div.scroll_item', [
    h('div.button', {on: {click: e => send({type: 'select_story', story: v[0]})}}, v[1].name)
  ])))
]