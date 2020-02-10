const H = require('snabbdom/h').default
const DefaultIPs = require('../../../util/defaultips')

const nodeTop = node => 
  H('div.section', [
    H('div.title', 'Info'),
    node.hostname ? H('div.item', `Hostname: ${node.hostname}`) : undefined,
    node.os ? H('div.item', `Operating System: ${node.os}`) : undefined,
    node.macs && node.macs.length ? H('div.subtitle', 'MAC Addresses:') : undefined,
    ...node.macs.map(v => H('div.item', `${v.mac} (${v.vendor})`)),
    H('div.subtitle', 'IP Addresses:'),
    ...node.ips.map(v => DefaultIPs.includes(v) ? undefined : H('div.item', v))
  ])

module.exports = nodeTop