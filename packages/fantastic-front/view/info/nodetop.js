import {h} from 'snabbdom/h'
const DefaultIPs = require('@infosecinnovations/fantastic-utils/defaultips')

const node_type = node => {
  if (!node.important) return 'Host outside my network'
  if (node.access === 'local') return 'Local host'
  if (node.access === 'remote') return 'Remote host with PowerShell access configured'
  return 'Host on my network without remote access'
}

export default node => 
  h('div.section', [
    h('h3', node_type(node)),
    node.hostname || node.os ? h('div', [
      node.hostname ? h('div.item', `Hostname: ${node.hostname}`) : undefined,
      node.os ? h('div.item', `Operating System: ${node.os}`) : undefined
    ]) : undefined,
    node.macs && node.macs.length ? h('div', [
      h('h4', 'MAC Addresses:'),
      ...node.macs.map(v => h('div.item', `${v.mac} (${v.vendor})`))
    ]) : undefined,
    h('div', [
      h('h4', 'IP Addresses:'),
      ...node.ips.map(v => DefaultIPs.includes(v) ? undefined : h('div.item', v))
    ])
  ])