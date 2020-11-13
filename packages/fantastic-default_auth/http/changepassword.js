const GetHTTPData = require('@infosecinnovations/fantastic-utils/gethttpdata')
const SetPassword = require('../accounts/setpassword')
const GetCookie = require('@infosecinnovations/fantastic-utils/getcookie')
const {get} = require('../db')
const GenerateID = require('@infosecinnovations/fantastic-utils/generateid')
const ParseQuery = require('@infosecinnovations/fantastic-utils/parsequery')
const Success = require('./success')
const Error = require('./error')

const error = res => Error(res, 'You must be logged in to change your password')

const changePassword = (res, req) => {
  res.onAborted(() => res.aborted = true)
  const session_id = GetCookie(req.getHeader('cookie'), 'session_id')
  if (!session_id) return error(res)
  GetHTTPData(res)
  .then(async data => {
    const row = await get({table: 'users', columns: ['username'], conditions: {columns: {session_id}}})
    if (!row) return error(res)
    const json = ParseQuery(data)
    const id = await GenerateID()
    await SetPassword(row.username, json.new_password)
    Success(res, id, '/auth')
  })
}

module.exports = changePassword