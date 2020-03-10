const DefaultIPs = require('fantastic-utils/defaultips')

const nodeName = node => node.hostname || (node.ips && node.ips.find(v => !DefaultIPs.includes(v)))

module.exports = nodeName