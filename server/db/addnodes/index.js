const {transaction} = require('../operations')
const UpdateNode = require('../updatenode')
const MatchingNodes = require('./matchingnodes')
const MergeNodes = require('./mergenodes')
const InsertNode = require('./insertnode')

/**
 * Add nodes (hosts) to the database. Will update existing data if matching hosts are found.
 * @param {import('../index').Node[]} nodes 
 * @param {boolean} overwrite 
 */
const addNodes = async (nodes, overwrite) => {
  console.log(`adding ${nodes.length} nodes to the database...`)
  const date = Date.now()
  const ids = []
  let new_nodes = 0
  for (const n of nodes) {
    const db = await transaction()
    try {
      const matches = await MatchingNodes(db, n) 
      if (!matches.length) await InsertNode(db, n, date).then(res => { // if no nodes match we can just insert a new one
        ids.push(res)
        new_nodes++
      })
      else if (matches.length == 1) await UpdateNode(matches[0].node_id, n, db, overwrite) // if we just found one node we can update it
        .then(() => ids.push(matches[0].node_id))
      else await MergeNodes(db, m, matches, overwrite, ids) // if we found multiple nodes that match, we have to merge all the information   
    }
    catch(e) {
      console.log(`addNodes failed: ${e.message}`)
    }
    await db.close()
  }
  console.log(`added data for ${nodes.length} nodes to the database in ${Date.now() - date}ms of which ${new_nodes} were new.`)
  return ids
}

module.exports = addNodes