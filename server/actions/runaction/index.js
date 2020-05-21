const {get} = require('../../db')
const GetAction = require('../../util/getpackageddata')
const UpdateResult = require('./updateresult')
const RunFunction = require('./runfunction')

const runAction = async (action, func, node_id, user, date, data, index) => {
  const row = await get({table: 'nodes', conditions: {columns: {node_id}}})
  const hostname = row.access === 'local' ? '' : row.hostname
  const obj = await GetAction(action)
  const result = await RunFunction(obj, func, user, hostname, data)
  await UpdateResult(action, func, node_id, user.user_id, date, result, index)
  return result
}

module.exports = runAction