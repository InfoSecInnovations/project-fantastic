import {h} from 'snabbdom/h'
import Log from './log'

export default (state, send) => h('div.logs', state.logs.map(v => Log(state, send, v)))