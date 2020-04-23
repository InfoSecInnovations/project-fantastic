const {get} = require('fantastic-utils/db')(require('../db/path'))
const GetAction = require('../util/getpackagedasset')
const UpdateResult = require('./updateresult')

const runActionFunction = async (action, func, node_id, date, data, key) => {
  const row = await get({table: 'nodes', conditions: {columns: {node_id}}})
  const hostname = row.access === 'local' ? '' : row.hostname
  const obj = GetAction(action)
  const result = await obj[func](hostname, data)
  await UpdateResult(action, func, node_id, date, result, key)
  return result
}

module.exports = runActionFunction