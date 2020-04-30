const {get} = require('fantastic-utils/db')(require('../../path'))
const ParseQuery = require('fantastic-utils/parsequery')
const CheckAdmin = require('../../auth/checkadmin')

const getAccount = (res, req) => {
  res.onAborted(() => res.aborted = true)
  CheckAdmin(res, req)
  .then(data => {
    const json = ParseQuery(data)
    get({table: 'users', conditions: {columns: {username: json.username}}})
    .then(row => {
      if (row) res.end(JSON.stringify(row))
      else res.end(JSON.stringify({error: 'user does not exist'}))
    }) 
  })
  .catch(() => {})
}

module.exports = getAccount