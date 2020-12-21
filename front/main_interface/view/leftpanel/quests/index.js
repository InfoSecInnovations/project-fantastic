import {h} from 'snabbdom/h'
import Daily from './daily'
import Story from './story'

export default (state, send) => h('div.scroll_container', [
  ...Daily(state, send),
  ...Story(state, send)
])