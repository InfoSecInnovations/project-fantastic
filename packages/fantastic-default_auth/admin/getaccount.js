const {get} = require('../db')
const ParseQuery = require('fantastic-utils/parsequery')
const CheckAdmin = require('./checkadmin')

const getAccount = (res, req) => {
  res.onAborted(() => res.aborted = true)
  CheckAdmin(res, req)
  .then(async result => {
    const json = ParseQuery(result.data)
    const row = await get({table: 'users', conditions: {columns: {username: json.username}}})
    if (row) res.end(JSON.stringify(row))
    else res.end(JSON.stringify({error: 'user does not exist'}))
  })
  .catch(() => {})
}

module.exports = getAccount