import {h} from 'snabbdom/h'
import Nodes from './nodes'

export default (state, send) => h('div#story_container_wrapper', h('div#story_container', {
    on: {click: e => send({type: 'select_story_node', node: null})},
    hook: {create: (_, vnode) => setTimeout(() => send({type: 'story_container', elm: vnode.elm}))},
    style: {
      transform: `scale(${state.story.scale})`
    }
  },
  Nodes(state, send)
))