const GetPackagedData = require("../../util/getpackageddata")

const createInventoryItems = async inventory_data => inventory_data ? Promise.all(Object.entries(inventory_data)
  .filter(v => v[1] != 'disabled')
  .map(v => GetPackagedData(v[0], 'inventory'))) : // TODO: filter out invalid scripts and warn the user
  Promise.resolve()

module.exports = createInventoryItems