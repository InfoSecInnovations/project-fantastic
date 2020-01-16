const {all, get} = require('./operations')

const getNodes = async date => {
  date = date || 0 // if we didn't supply a date we want to get all of the results
  const rows = await all({table: 'nodes', conditions: {columns: {date}, compare: '>='}})
  const nodes = []
  for (r of rows) {
    const connections = await all({table: 'connections', conditions: {groups: [{columns: {from_id: r.node_id}}, {columns: {date}, compare: '>='}]}})
    .then(async res => {
      for (c of res) {
        const process = await get({table: 'processes', columns: ['name', 'pid'], conditions: {columns: {process_id: c.process_id}}})
        c.process = {id: process.pid, name: process.name}
      }
      return res
    }) || []
    nodes.push({...r, connections})
  }
  return nodes
}

module.exports = getNodes