import {h} from 'snabbdom/h'
import IPAddress from '../../util/ipaddress'
import ConnectionSearch from './connectionsearch'

const connection_view = (state, send, connection) => h('div.scroll_item', [
  h('div.item', `Local address: ${IPAddress(connection.local_address, connection.local_port)}`),
  h('div.item', `Remote address: ${IPAddress(connection.remote_address, connection.remote_port)}`),
  h('div.item', `Process: ${connection.process.name}`),
  h('div.item', `State: ${connection.state.replace('_', ' ')}`),
  state.connection_search ? ConnectionSearch(state, send, connection) : undefined
])

export default (state, send, connections, label) => [
  h('h4', [label || 'Connections', ` (${connections.length}):`].flat()),
  connections.length ? h('div.scroll', connections.map(v => connection_view(state, send, v))) : undefined
]