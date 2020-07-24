import {h} from 'snabbdom/h'
import Controls from './controls'
import Filtering from './filtering'

export default (state, send) => h('div.search', [
    Filtering(state, send),
    Controls(state, send)
  ])