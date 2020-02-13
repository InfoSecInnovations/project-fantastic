const DefaultIPs = require('../../packages/fantastic-utils/defaultips')

const nodeName = node => node.hostname || (node.ips && node.ips.find(v => !DefaultIPs.includes(v)))

module.exports = nodeName