const GetPackagedData = require('../util/getpackageddata')
const HasRole = require('@infosecinnovations/fantastic-utils/hasrole')
const End = require('./end')

const getInventoryItems = (user, res, req, query, inventory_items) => {
  console.log('getInventoryItems: received http request to get inventory settings...')
  if (!HasRole(user, 'user')) return End(res)
  Promise.all(Object.entries(inventory_items)
    .map(v => GetPackagedData(v[0], 'inventory').then(item => ({...item, key: v[0], mode: v[1]})))
  ) // TODO: filter out invalid scripts and warn the user
  .then(inventory_items => {
    const inventory_data = inventory_items.reduce((result, v) => ({ 
      ...result, 
      [v.key]: {
        key: v.key, 
        name: v.name, 
        description: v.description, 
        hosts: v.hosts, 
        category: v.category, 
        mode: v.mode,
        role: v.role, 
        command: v.run.command,
        module: v.module
      }
    }), {})
    if (res.aborted) return
    console.log(`getInventoryItems: sent metadata for ${Object.keys(inventory_data).length} inventory items.`)
    res.end(JSON.stringify(inventory_data))
  })
}

module.exports = getInventoryItems