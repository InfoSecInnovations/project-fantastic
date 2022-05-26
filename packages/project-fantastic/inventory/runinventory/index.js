const DB = require('../../db')
const PwshFunction = require('../../util/pwshfunction')
const CreateInventoryItems = require('./createinventoryitems')
const GetHosts = require('./gethosts')

const runInventory = async get_inventory_data => {
  const inventory_items = await CreateInventoryItems(get_inventory_data())
  if (!inventory_items) { // when we're running in a child process the inventory data sometimes takes a tick or so to get transferred over
    console.log('no inventory items found, retrying in 1s!')
    return setTimeout(() => runInventory(get_inventory_data), 1000)
  }
  const loop = async () => {
    console.log('-----getting hosts for inventory scanning...-----')
    const hosts = await GetHosts()
    console.log('-----running inventory scans on hosts...-----')
    const date = Date.now()
    for (const node of hosts) {
      for (const item of inventory_items) {
        const output = await PwshFunction(item.run)(item.run.command, node.access == 'local' ? null : node.hostname)
        .then(res => res.map(v => typeof v == 'object' ? JSON.stringify(v) : v))
        // find matching database records
        const existing = await DB.all({table: 'inventory_data', columns: ['inventory_data_id', 'data'], conditions: {groups: [{columns: {category: item.category, node_id: node.node_id}}, {columns: {data: output}, compare: 'IN'}]}})
        // update existing
        await DB.update({table: 'inventory_data', row: {date}, conditions: {columns: {inventory_data_id: existing.map(v => v.inventory_data_id)}, compare: 'IN'}})
        // insert new
        await DB.insert('inventory_data', output.filter(v => !existing.some(e => v == e.data)).map(v => ({date, data: v, category: item.category, node_id: node.node_id})))
      }
    }
    console.log('-----completed inventory scans on hosts.-----')
    loop()
  }
  loop()
}

module.exports = runInventory