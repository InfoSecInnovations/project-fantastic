import {h} from 'snabbdom/h'
import MenuBar from './menubar'

export default (state, send) => h('div#config.content', {class: {hidden: state.mode != 'config'}}, [
  h('div#menu-bar.panel', MenuBar(state, send)),
])