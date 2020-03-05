const {get} = require('../db/operations')
const GetAction = require('../util/getpackagedasset')
const UpdateResult = require('./updateresult')

const runAction = async (action, node_id) => {
  const row = await get({table: 'nodes', conditions: {columns: {node_id}}})
  const hostname = row.access === 'local' ? '' : row.hostname
  const obj = GetAction(action)
  const result = await obj.run(hostname)
  await UpdateResult(action, 'run', node_id, result)
  return result
}

module.exports = runAction