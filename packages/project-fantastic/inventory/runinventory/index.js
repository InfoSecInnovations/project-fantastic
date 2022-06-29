const {transaction} = require('../../db')
const PwshFunction = require('../../util/pwshfunction')
const IsBlocked = require('@infosecinnovations/fantastic-utils/isblocked')
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
        const db = await transaction()
        // get rules for category
        const block_rules = await db.all({table: 'inventory_rules', conditions: {columns: {category: item.category, rule_type: 'block'}}}).then(res => res.map(rule => ({...rule, data: JSON.parse(rule.data)})))
        const allow_rules = await db.all({table: 'inventory_rules', conditions: {columns: {category: item.category, rule_type: 'allow'}}}).then(res => res.map(rule => ({...rule, data: JSON.parse(rule.data)})))
        const blocked = data => IsBlocked(data, allow_rules, block_rules)
        // find matching database records
        const existing = await db.all({table: 'inventory_data', columns: ['inventory_data_id', 'data'], conditions: {groups: [{columns: {category: item.category, node_id: node.node_id}}, {columns: {data: output}, compare: 'IN'}]}})
        for (const data of existing) {
          await db.update({table: 'inventory_data', row: {date, blocked: blocked(JSON.parse(data.data)) ? 1 : 0}, conditions: {columns: {inventory_data_id: data.inventory_data_id}}})
        }
        // insert new
        await db.insert('inventory_data', output.filter(v => !existing.some(e => v == e.data)).map(v => ({date, data: v, category: item.category, node_id: node.node_id, blocked: blocked(JSON.parse(v)) ? 1 : 0})))
        await db.close()
      }
    }
    console.log('-----completed inventory scans on hosts.-----')
    loop()
  }
  loop()
}

module.exports = runInventory