import {h} from 'snabbdom/h'
import HostString from '../../util/hoststring'

export default (state, action, button_data) => {
  const data = state.actions[action]
  return h('div.scroll_item spaced', [
    h('div.item', [
      h('h3', data.name),
      button_data == 'loading' ? h('div.button disabled', 'Running...') : h('div.button', button_data, 'Run')
    ]),
    h('pre', state.actions[action].commands[v.function]),
    data.description ? h('div.item', data.description) : undefined,
    h('div.targets', [h('b', 'Valid targets:'), ` ${data.hosts.map(HostString).join(', ')}.`])
  ])
}