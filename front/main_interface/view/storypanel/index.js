import {h} from 'snabbdom/h'
import Graph from './graph'

export default (state, send) => h('div#story_viewer', {
  class: {hidden: state.loading || !state.story.selected}
}, [
  Graph(state, send),
  h('div.icon_button close', {on: {click: e => send({type: 'select_story', story: null})}}, h('div.fas fa-times fa-fw'))
])