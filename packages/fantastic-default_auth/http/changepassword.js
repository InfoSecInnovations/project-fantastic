const GetHTTPData = require('fantastic-utils/gethttpdata')
const SetPassword = require('../accounts/setpassword')
const GetCookie = require('fantastic-utils/getcookie')
const {get} = require('../db')
const GenerateID = require('../utils/generateid')
const ParseQuery = require('fantastic-utils/parsequery')

const changePassword = (res, req) => {
  res.onAborted(() => res.aborted = true)
  const session_id = GetCookie(req.getHeader('cookie'), 'session_id')
  if (!session_id) return res.end('You must be logged in to change your password')
  GetHTTPData(res)
  .then(async data => {
    const row = await get({table: 'users', columns: ['username'], conditions: {columns: {session_id}}})
    if (!row) return res.end('You must be logged in to change your password')
    const json = ParseQuery(data)
    const id = await GenerateID()
    await SetPassword(row.username, json.new_password)
    res.writeStatus('302 Found')
    res.writeHeader('Location', '/auth')
    res.writeHeader('Set-Cookie', `session_id=${id}; Secure; HttpOnly; Path=/;`)
    res.end()
  })
}

module.exports = changePassword