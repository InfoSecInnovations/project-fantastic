const {all} = require('./operations')

const getInventoryData = query => all({table: 'inventory_data', conditions: {groups: [
  {columns: {node_id: query.nodes}, compare: 'IN'},
  {columns: {date: query.date}, compare: '>='}
]}}).then(res => res.map(d => ({...d, data: JSON.parse(d.data)})))

module.exports = getInventoryData