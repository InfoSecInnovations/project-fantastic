const H = require('snabbdom/h').default
const IPAddress = require('../../util/ipaddress')

const connections = (connections, label) => 
  H('div.scroll_container.section', [
    H('div.subtitle', `${label || 'Connections'} (${connections.length}):`),
    H('div.scroll', connections.map(v => H('div.scroll_item', [
      H('div.item', `Local address: ${IPAddress(v.local_address, v.local_port)}`),
      H('div.item', `Remote address: ${IPAddress(v.remote_address, v.remote_port)}`),
      H('div.item', `Process: ${v.process.name}`),
      H('div.item', `State: ${v.state.replace('_', ' ')}`)
    ])))
  ])


module.exports = connections