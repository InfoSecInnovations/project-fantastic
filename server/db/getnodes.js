const {all, get} = require('./operations')

const getNodes = async () => { // TODO: select only recent nodes and connections
  const rows = await all('nodes')
  const nodes = []
  for (r of rows) {
    const connections = await all('connections', [], {from_id: r.node_id})
    .then(async res => {
      for (c of res) {
        const process = get('processes', ['name', 'pid'], {process_id: c.process_id})
        c.process = {id: process.pid, name: process.name}
      }
      return res
    }) || []
    nodes.push({...r, connections})
  }
  return nodes
}

module.exports = getNodes