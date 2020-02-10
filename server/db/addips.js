const {all, update, insert} = require('./operations')

const addIps = (node_id, ips, date) => {
  if (!ips) return Promise.resolve() 
  return all({table: 'ips', columns: ['ip', 'ip_id'], conditions: {groups: [{columns: {node_id}}, {columns: {ip: ips}, compare: 'IN'}]}}) // select IPs we already have
  .then(res => 
    update({table: 'ips', row: {date}, conditions: {columns: {ip_id: res.map(v => v.ip_id)}, compare: 'IN'}}) // update the existing ones
    .then(() => Promise.all(ips.filter(v => !res.find(r => r.ip === v)).map(v => insert('ips', {ip: v, node_id, date})))) // insert the new ones
  )
}

module.exports = addIps