import {h} from 'snabbdom/h'
import LeftPanel from './leftpanel'
import Selection from './selection'
import Tooltip from './tooltip'
import Top from './top'

export default (state, send) => 
  h('body', [
    h('div#container', [
      Top(state, send),
      h('div#main', [
        h('div#graph_container', {
          hook: {create: (_, vnode) => setTimeout(() => send({type: 'graph_container', container: vnode.elm}))},
          style: {display: state.loading ? 'none' : 'block'}
        }),
        state.loading ? h('div#loading', 'Loading...') : undefined,
        LeftPanel(state, send),
        Selection(state, send),
        Tooltip(state)
      ])
    ])
  ])