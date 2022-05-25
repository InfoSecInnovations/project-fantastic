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
    for (const node of hosts) {
      for (const item of inventory_items) {
        const output = await PwshFunction(item.run)(item.run.command, node.access == 'local' ? null : node.hostname)
        if (output) console.log(output)
        // TODO: insert data into database
      }
    }
    loop()
  }
  loop()
}

module.exports = runInventory