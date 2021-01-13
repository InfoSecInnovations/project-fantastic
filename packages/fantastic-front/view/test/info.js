import {h} from 'snabbdom/h'
import HostString from '../../util/hoststring'
const FormatString = require('@infosecinnovations/fantastic-utils/formatstring')
import StatusIcon from '../statusicon'

export default (state, data, parameters, status) => {
  return [
    h('div.item', [
      h('h3', data.name),
      StatusIcon(status),
    ]),
    data.description ? h('div.item', FormatString(data.description, parameters)) : undefined,
    h('div', [
      'Uses Actions:',
      h('ul', data.actions.map(v => h('li', state.actions[v].name)))
    ]),
    h('div.targets', [h('b', 'Valid targets:'), ` ${data.hosts.map(HostString).join(', ')}.`])
  ]
} 