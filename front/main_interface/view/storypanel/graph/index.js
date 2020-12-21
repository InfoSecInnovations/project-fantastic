import {h} from 'snabbdom/h'
import Nodes from './nodes'

export default (state, send) => h('div#story_container', {
    hook: {create: (_, vnode) => setTimeout(() => send({type: 'story_container', id: vnode.elm.id}))}
  },
  Nodes(state, send)
)