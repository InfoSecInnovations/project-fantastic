const H = require('snabbdom/h').default
const NodeName = require('../../../common/util/nodename')
const DefaultIPs = require('fantastic-utils/defaultips')

const multi = (state, send) => {
  return H('div', state.selected.nodes.map(v => {
    const node = state.nodes[v]
    const ip = node.ips.find(v => !DefaultIPs.includes(v))
    return H('div.section', [
      H('a.subtitle', {
        on: {click: [
          [send, {type: 'vis_select', node: v}],
          [send, {type: 'select', node: v}]
        ]}
      }, NodeName(node)),
      node.hostname ? H('div.item', `Hostname: ${node.hostname}`) : undefined,
      H('div.item', ip ? `IP: ${ip}` : 'no IP address data!'),
      node.macs && node.macs.length ? H('div.item', `MAC: ${node.macs[0].mac}`) : undefined,
      node.os ? H('div.item', `Operating System: ${node.os}`) : undefined,
      H('div.item', `${(node.connections && node.connections.length) || 0} connection${node.connections && node.connections.length === 1 ? '' : 's'}`)
    ])
  }))
}

module.exports = multi