import {h} from 'snabbdom/h'
import Controls from './controls'

export default (state, send) => h('div.search', [
    Controls(state, send)
  ])