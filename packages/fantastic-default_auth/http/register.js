const Success = require('./success')
const {get} = require('../db')
const CreateAccount = require('../accounts/createaccount')
const GetHTTPData = require('fantastic-utils/gethttpdata')

const register = (res, req) => {
  res.onAborted(() => res.aborted = true)
  GetHTTPData()
  .then(async data => {
    const json = JSON.parse(data)
    const row = await get({table: 'users', columns: ['user_id'], conditions: {columns: {username: json.username}}})
    if(row) {
      res.end('user already exists or username is invalid! TODO: redirect to auth page with this message')
    }
    else {
      const id = await CreateAccount(json.username, json.password, 'user')
      Success(res, id)
    }
  })
}

module.exports = register