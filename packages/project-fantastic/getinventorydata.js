// this is intended to be run in a separate process when running the server in child process mode
const RunInventory = require('./inventory/runinventory')

let inventory_data

process.on('message', m => {
  if (m.type == 'inventory_items') inventory_data = m.inventory_items
})

RunInventory(() => inventory_data)