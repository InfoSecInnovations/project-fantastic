const {get} = require('../db/operations')
const GetAction = require('../util/getpackagedasset')
const UpdateResult = require('./updateresult')

const runActionFunction = async (action, func, data, node_id) => {
  const row = await get({table: 'nodes', conditions: {columns: {node_id}}})
  const hostname = row.access === 'local' ? '' : row.hostname
  const obj = GetAction(action)
  const result = await obj[func](data, hostname)
  await UpdateResult(action, func, node_id, result)
  return result
}

module.exports = runActionFunction