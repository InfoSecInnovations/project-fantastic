import {h} from 'snabbdom/h'
import HostString from '../../util/hoststring'
const FormatString = require('@infosecinnovations/fantastic-utils/formatstring')
import StatusIcon from '../statusicon'
import FavoriteButton from '../favoritebutton'

export default (state, send, data, parameters, status) => {
  return [
    h('div.item', [
      FavoriteButton(state, send, 'scans', data.key),
      h('h3', data.name),
      StatusIcon(status),
    ]),
    data.description ? h('div.item', FormatString(data.description, parameters)) : undefined,
    h('div.scan_actions', [
      'Uses Actions:',
      h('ul', data.actions.map(v => h('li', h('div.item', [
        FavoriteButton(state, send, 'actions', v),
        h('div', state.actions[v].name)
      ]))))
    ]),
    h('div.targets', [h('b', 'Valid targets:'), ` ${data.hosts.map(HostString).join(', ')}.`])
  ]
} 