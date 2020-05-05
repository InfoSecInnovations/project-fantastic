const {all, update, insert} = require('./operations')

const addMacs = (node_id, macs, overwrite) => {
  if (!macs) return Promise.resolve()
  return all({table: 'macs', columns: ['mac', 'mac_id'], conditions: {columns: {mac: macs.map(v => v.mac)}, compare: 'IN'}}) // select MACs we already have
  .then(res => 
    Promise.all([
      ...res.map(v => (overwrite || !v.vendor) && update({table: 'macs', row: {vendor: macs.find(m => m.mac === v.mac).vendor}, conditions: {columns: {mac_id: v.mac_id}}})), // update the existing MACs if we can overwrite
      ...macs.filter(v => !res.find(r => r.mac === v.mac)).map(v => insert('macs', {mac: v.mac, vendor: v.vendor, node_id})) // insert the new ones
    ])
  )
}

module.exports = addMacs