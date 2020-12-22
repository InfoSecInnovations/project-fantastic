import {h} from 'snabbdom/h'
import Graph from './graph'
import Info from './info'

export default (state, send) => {
  return h('div#story_viewer', {
    class: {hidden: !state.stories || !state.story.selected}
  }, [
    h('div.panel scroll_container', Info(state, send)),
    Graph(state, send),
    h('div.icon_button close', {on: {click: e => send({type: 'select_story', story: null})}}, h('div.fas fa-times fa-fw'))
  ])
} 