import {h} from 'snabbdom/h'
import HostString from '../../util/hoststring'

export default (state, action, click) => {
  const data = state.actions[action]
  return h('div.scroll_item spaced', [
    h('div.item', [
      h('h3', data.name),
      h('div.button', { on: {click}}, 'Run')
    ]),
    data.description ? h('div.item', data.description) : undefined,
    h('div.targets', [h('b', 'Valid targets:'), ` ${data.hosts.map(HostString).join(', ')}.`])
  ])
}