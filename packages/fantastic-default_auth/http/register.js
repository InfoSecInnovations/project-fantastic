const Success = require('./success')
const Error = require('./error')
const {get} = require('../db')
const CreateAccount = require('../accounts/createaccount')
const GetHTTPData = require('fantastic-utils/gethttpdata')
const ParseQuery = require('fantastic-utils/parsequery')

const register = (res, req) => {
  res.onAborted(() => res.aborted = true)
  GetHTTPData(res)
  .then(async data => {
    const json = ParseQuery(data)
    const row = await get({table: 'users', columns: ['user_id'], conditions: {columns: {username: json.username}}})
    if (row) return Error(res, 'user already exists or username is invalid!')
    const id = await CreateAccount(json.username, json.password, 'user')
    Success(res, id, '/auth')
  })
}

module.exports = register