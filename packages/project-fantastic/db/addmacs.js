/**
 * Add MAC addresses corresponding to a node to the database
 * @param {number} node_id database ID of the node owning the MACs
 * @param {?{mac: string, vendor: string}[]} macs 
 * @param {import('@infosecinnovations/fantastic-db/types').Operations} db 
 * @param {boolean} overwrite can we overwrite existing data?
 */
const addMacs = (node_id, macs, db, overwrite) => {
  if (!macs) return Promise.resolve()
  return db.all({table: 'macs', columns: ['mac', 'mac_id'], conditions: {columns: {mac: macs.map(v => v.mac)}, compare: 'IN'}}) // select MACs we already have
  .then(async res => {
    for (const row of res) {
      if (overwrite || !row.vendor) await db.update({table: 'macs', row: {vendor: macs.find(m => m.mac === row.mac).vendor}, conditions: {columns: {mac_id: row.mac_id}}}) // update the existing MACs if we can overwrite
    }
    for (const mac of macs) {
      if (!res.find(r => r.mac === mac.mac)) await db.insert('macs', {mac: mac.mac, vendor: mac.vendor, node_id})
    }
  })
}

module.exports = addMacs