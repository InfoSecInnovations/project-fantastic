const H = require('snabbdom/h').default

const address = (ip, port) => `${(ip.includes(':') ? `[${ip}]` : ip)}:${port}`

const info = (state, send) => {
  if (state.selected.node === undefined) return
  const node = state.nodes[state.selected.node]
  return H('div#info', [
    H('div.section', [
      H('div.title', 'Info'),
      H('div.item', `hostname: ${node.hostname}`),
      H('div.item', `IPV4: ${node.ipv4}`),
      H('div.item', `IPV6: ${node.ipv6}`),
      H('div.item', `Mac: ${node.mac}`),
      H('div.item', `Last updated: ${Date(node.date).toString()}`)
    ]),
    H('div#connections_container.section', [
      H('div.subtitle', `Connections (${node.connections.length}):`),
      H('div.connections', node.connections.map(v => H('div.connection', [
        H('div.item', `Local address: ${v.local_address}`),
        H('div.item', `Local port: ${v.local_port}`),
        H('div.item', `Remote address: ${address(v.remote_address, v.remote_port)}`),
        H('div.item', `Process: ${v.process.name}`),
        H('div.item', `State: ${v.state.replace('_', ' ')}`),
        H('div.item', `Last updated: ${Date(v.date).toString()}`)
      ])))
    ])
  ])
}

module.exports = info