const H = require('snabbdom/h').default
const DefaultIPs = require('fantastic-utils/defaultips')

const node_type = node => {
  if (!node.important) return 'Host outside my network'
  if (node.access === 'local') return 'Local host'
  if (node.access === 'remote') return 'Remote host with PowerShell access configured'
  return 'Host on my network without remote access'
}

const nodeTop = node => 
  H('div.section', [
    H('h3', node_type(node)),
    node.hostname ? H('div.item', `Hostname: ${node.hostname}`) : undefined,
    node.os ? H('div.item', `Operating System: ${node.os}`) : undefined,
    node.macs && node.macs.length ? H('h3', 'MAC Addresses:') : undefined,
    ...node.macs.map(v => H('div.item', `${v.mac} (${v.vendor})`)),
    H('h3', 'IP Addresses:'),
    ...node.ips.map(v => DefaultIPs.includes(v) ? undefined : H('div.item', v))
  ])

module.exports = nodeTop