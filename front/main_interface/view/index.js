import {h} from 'snabbdom/h'
import LeftPanel from './leftpanel'
import Selection from './selection'
import Tooltip from './tooltip'
import Top from './top'
import Review from './review'
import StoryPanel from './storypanel'

export default (state, send) => 
  h('body', [
    h('div#container', [
      Top(state, send),
      h('div#graph_container', {
        hook: {create: (_, vnode) => setTimeout(() => send({type: 'graph_container', container: vnode.elm}))},
        class: {hidden: state.loading}
      }),
      StoryPanel(state, send),
      state.loading ? h('div#loading', 'Loading...') : undefined,
      LeftPanel(state, send),
      Selection(state, send),
      Review(state, send)
    ]),
    Tooltip(state)
  ])