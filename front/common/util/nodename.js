const DefaultIPs = require('@infosecinnovations/fantastic-utils/defaultips')

export default node => node.hostname || (node.ips && node.ips.find(v => !DefaultIPs.includes(v)))