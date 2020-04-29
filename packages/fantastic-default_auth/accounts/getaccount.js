const {get} = require('fantastic-utils/db')(require('../path'))
const ParseQuery = require('fantastic-utils/parsequery')
const GetCookie = require('fantastic-utils/getcookie')
const GetHTTPData = require('fantastic-utils/gethttpdata')

const failed_login = 'you must be logged in as an administrator!'

const getAccount = (res, req) => {
  res.onAborted(() => res.aborted = true)
  const header = req.getHeader('cookie')
  const admin_id = GetCookie(header, 'admin_id')
  if (!admin_id) return res.end(JSON.stringify({error: failed_login}))
  GetHTTPData(res)
  .then(data => {
    get({table: 'users', columns: ['user_id'], conditions: {columns: {admin_session_id: admin_id}}})
    .then(row => {
      if (!row) return res.end(JSON.stringify({error: failed_login}))
      const json = ParseQuery(data)
      get({table: 'users', conditions: {columns: {username: json.username}}})
      .then(row => {
        if (row) res.end(JSON.stringify(row))
        else res.end(JSON.stringify({error: 'user does not exist'}))
      })   
    })
  })
}

module.exports = getAccount