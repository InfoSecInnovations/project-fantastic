const GetPackagedData = require("../../util/getpackageddata")

const createInventoryItems = async inventory_data => inventory_data ? Promise.all(Object.entries(inventory_data)
  .filter(v => v[1] != 'disabled')
  .map(async v => {
    const data = await GetPackagedData(v[0], 'inventory')
    return {key: v[0], data}
  })) : // TODO: filter out invalid scripts and warn the user
  Promise.resolve()

module.exports = createInventoryItems