import {h} from 'snabbdom/h'
const NodeName = require('../../../common/util/nodename')
const DefaultIPs = require('fantastic-utils/defaultips')

export default (state, send) => {
  return h('div.scroll_container', state.selected.nodes.map(v => {
    const node = state.nodes[v]
    const ip = node.ips.find(v => !DefaultIPs.includes(v))
    return h('div.section', [
      h('h3', {
        on: {click: [
          [send, {type: 'vis_select', node: v}],
          [send, {type: 'select', node: v}]
        ]}
      }, NodeName(node)),
      h('div', [
        node.hostname ? h('div', `Hostname: ${node.hostname}`) : undefined,
        h('div', ip ? `IP: ${ip}` : 'no IP address data!'),
        node.macs && node.macs.length ? h('div', `MAC: ${node.macs[0].mac}`) : undefined,
        node.os ? h('div', `Operating System: ${node.os}`) : undefined,
        h('div', `${(node.connections && node.connections.length) || 0} connection${node.connections && node.connections.length === 1 ? '' : 's'}`)
      ])
    ])
  }))
}