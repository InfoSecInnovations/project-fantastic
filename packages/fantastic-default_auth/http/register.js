const Success = require('./success')
const Error = require('./error')
const {get} = require('../db')
const CreateAccount = require('../accounts/createaccount')
const GetHTTPData = require('@infosecinnovations/fantastic-utils/gethttpdata')
const ParseQuery = require('@infosecinnovations/fantastic-utils/parsequery')
const GetConfig = require('../utils/getconfig')

const register = (res, req) => {
  res.onAborted(() => res.aborted = true)
  GetHTTPData(res)
  .then(async data => {
    const json = ParseQuery(data)
    const config = await GetConfig()
    if (!json.username || !json.username.length || (config.min_username_length && json.username.length < config.min_username_length)) return Error(res, `username must be at least ${config.min_username_length || 1} characters long`)
    if (!json.password || !json.password.length || (config.min_password_length && json.password.length < config.min_password_length)) return Error(res, `password must be at least ${config.min_password_length || 1} characters long`)
    const row = await get({table: 'users', columns: ['user_id'], conditions: {columns: {username: json.username}}})
    if (row) return Error(res, 'user already exists or username is invalid!')
    const id = await CreateAccount(json.username, json.password, 'user')
    Success(res, id, '/auth')
  })
}

module.exports = register