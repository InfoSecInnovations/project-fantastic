import {h} from 'snabbdom/h'
import LeftPanel from './leftpanel'
const Selection = require('./selection')
import Tooltip from './tooltip'
const Top = require('./top')

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