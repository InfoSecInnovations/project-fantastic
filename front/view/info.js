const H = require('snabbdom/h').default

const address = (ip, port) => `${(ip.includes(':') ? `[${ip}]` : ip)}:${port}`

const info = (state, send) => {
  if (typeof state.selected.node !== 'number') return
  const node = state.nodes[state.selected.node]
  return H('div#info', [
    H('div.section', [
      H('div.title', 'Info'),
      H('div.item', `Hostname: ${node.hostname}`),
      node.mac ? H('div.item', `Mac: ${node.mac}`) : undefined,
      node.vendor ? H('div.item', `Vendor: ${node.vendor}`) : undefined,
      node.os ? H('div.item', `Operating System: ${node.os}`) : undefined,
      H('div.subtitle', 'IP Addresses:'),
      ...node.ips.map(v => H('div.item', v)),
      H('div.divider')
    ]),
    H('div#connections_container.section', [
      H('div.subtitle', `Connections (${node.connections.length}):`),
      H('div.connections', node.connections.map(v => H('div.connection', [
        H('div.item', `Local address: ${address(v.local_address, v.local_port)}`),
        H('div.item', `Remote address: ${address(v.remote_address, v.remote_port)}`),
        H('div.item', `Process: ${v.process.name}`),
        H('div.item', `State: ${v.state.replace('_', ' ')}`)
      ])))
    ])
  ])
}

module.exports = info