import {h} from 'snabbdom/h'
import IPAddress from '../util/ipaddress'

export default (connections, label) => [
  h('h4', [label || 'Connections', ` (${connections.length}):`].flat()),
  connections.length ? h('div.scroll', connections.map(v => h('div.scroll_item', [
    h('div.item', `Local address: ${IPAddress(v.local_address, v.local_port)}`),
    h('div.item', `Remote address: ${IPAddress(v.remote_address, v.remote_port)}`),
    h('div.item', `Process: ${v.process.name}`),
    h('div.item', `State: ${v.state.replace('_', ' ')}`)
  ]))) : undefined
]