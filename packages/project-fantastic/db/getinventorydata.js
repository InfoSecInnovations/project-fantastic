const {all} = require('./operations')

const getInventoryData = query => all({table: 'inventory_data', conditions: {groups: [
  {columns: {node_id: query.nodes}, compare: 'IN'},
  {columns: {date: query.date}, compare: '>='}
]}}).then(res => res.reduce((result, d) => {
  if (!result[d.node_id]) result[d.node_id] = {}
  if (!result[d.node_id][d.category]) result[d.node_id][d.category] = []
  result[d.node_id][d.category].push({...d, data: JSON.parse(d.data)})
  return result
}, {}))

module.exports = getInventoryData