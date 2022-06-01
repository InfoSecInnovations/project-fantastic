import {h} from 'snabbdom/h'
import LeftPanel from './leftpanel'
import Selection from './selection'
import Tooltip from './tooltip'
import Top from './top'
import Review from './review'
import StoryPanel from './storypanel'
import SaveSearch from './savesearch'
import NodeWarning from './nodewarning'
import ActionInput from '@infosecinnovations/fantastic-front/view/actions/actioninput'
import InventoryPanel from './inventorypanel'

export default (state, send) => 
  h('body', [
    h('div#container', [
      Top(state, send),
      h('div#graph_container', {
        hook: {create: (_, vnode) => setTimeout(() => send({type: 'graph_container', container: vnode.elm}))},
        class: {hidden: state.loading}
      }),
      SaveSearch(state, send),
      NodeWarning(state, send),
      ActionInput(state, send),
      StoryPanel(state, send),
      state.loading ? h('div#loading', 'Loading...') : undefined,
      state.view_inventory.category ? InventoryPanel(state, send) : undefined,
      LeftPanel(state, send),
      Selection(state, send),
      Review(state, send)
    ]),
    Tooltip(state)
  ])