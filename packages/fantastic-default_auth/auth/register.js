const Success = require('./success')
const {get} = require('fantastic-utils/db')(require('../path'))
const CreateAccount = require('../accounts/createaccount')

const register = (res, json) => {

  get({table: 'users', columns: ['user_id'], conditions: {columns: {username: json.username}}})
  .then(row => {
    if(row) {
      res.end('user already exists or username is invalid! TODO: redirect to auth page with this message')
    }
    else {
      CreateAccount(json.username, json.password, 'user')
      .then(() => Success(res))
    }
  })
}

module.exports = register