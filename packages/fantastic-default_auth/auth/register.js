const Success = require('./success')
const {get} = require('fantastic-utils/db')(require('../path'))
const CreateAccount = require('../accounts/createaccount')
const GetHTTPData = require('fantastic-utils/gethttpdata')

const register = (res, req) => {
  res.onAborted(() => res.aborted = true)
  GetHTTPData()
  .then(data => {
    const json = JSON.parse(data)
    get({table: 'users', columns: ['user_id'], conditions: {columns: {username: json.username}}})
    .then(row => {
      if(row) {
        res.end('user already exists or username is invalid! TODO: redirect to auth page with this message')
      }
      else {
        CreateAccount(json.username, json.password, 'user')
        .then(id => Success(res, id))
      }
    })
  })

}

module.exports = register