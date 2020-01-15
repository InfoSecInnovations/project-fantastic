const {update, insert, get} = require('./operations')

const addNodes = async nodes => { // this seems a bit messy but it does the job (hopefully)
  const date = Date.now()
  for (const n of nodes) {
    await get('nodes', ['node_id'], {ipv4: n.ipv4, ipv6: n.ipv6, mac: n.mac}, 'OR') // find a node with the same address as this one
    .then(res => { // TODO: merge nodes if we have separate ones for ipv4 and ipv6 that we realise are the same
      const columns = ['ipv4', 'ipv6', 'mac', 'hostname']
      return res ?
        update('nodes', columns.reduce((result, v) => ({...result, [v]: n[v]}), {date}), {node_id: res.node_id}) : // if this node exists, update it with any new information
        insert('nodes', columns.reduce((result, v) => ({...result, [v]: n[v]}), {date})) // if not we can just insert a new row
    })
    .catch(rej => console.log(rej.message))
  }
}

module.exports = addNodes