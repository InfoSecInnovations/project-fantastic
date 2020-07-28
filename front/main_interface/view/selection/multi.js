import {h} from 'snabbdom/h'
const NodeName = require('../../../common/util/nodename')
const DefaultIPs = require('fantastic-utils/defaultips')

export default (state, send) => {
  return h('div', state.selected.nodes.map(v => {
    const node = state.nodes[v]
    const ip = node.ips.find(v => !DefaultIPs.includes(v))
    return h('div.section', [
      h('a.subtitle', {
        on: {click: [
          [send, {type: 'vis_select', node: v}],
          [send, {type: 'select', node: v}]
        ]}
      }, NodeName(node)),
      node.hostname ? h('div.item', `Hostname: ${node.hostname}`) : undefined,
      h('div.item', ip ? `IP: ${ip}` : 'no IP address data!'),
      node.macs && node.macs.length ? h('div.item', `MAC: ${node.macs[0].mac}`) : undefined,
      node.os ? h('div.item', `Operating System: ${node.os}`) : undefined,
      h('div.item', `${(node.connections && node.connections.length) || 0} connection${node.connections && node.connections.length === 1 ? '' : 's'}`)
    ])
  }))
}