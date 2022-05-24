const GetPackageScripts = require('../util/getpackagescripts')
const {get} = require('../db')

/**
 * 
 * @param {{}} config 
 * @returns {Promise<Object.<string, 'enabled' | 'disabled' | 'force'>>} keys are item name, values are the item's status
 */
const getInventoryData = async config => {
  return await Promise.all(
    config.assets.packages.map(v => GetPackageScripts(v, 'inventory')
      .then(async res => {
        const result = []
        for (const k of res) {
          const inventory = `${v}/${k}`
          let mode
          if (config.assets.force_inventory.includes(inventory)) mode = 'force'
          else mode = await get({table: 'inventory_history', columns: ['status'], conditions: {columns: {item_name: inventory}}, order_by: {date: 'DESC'}})
          .then(res => {
            if (typeof res === 'undefined') return config.assets.default_enable_inventory.includes(inventory) ? 'enabled' : 'disabled'
            return res.status ? 'enabled' : 'disabled'
          })
          result.push({[inventory]: mode})
        }
        return result
      })
    )
  )
  .then(res => 
    res.flat()
    .reduce((result, v) => ({...result, ...v}), {})
  )
}

module.exports = getInventoryData