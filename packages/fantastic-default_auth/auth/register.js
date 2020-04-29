const BCrypt = require('bcrypt')
const GenerateID = require('./generateid')
const Success = require('./success')
const {get, insert} = require('fantastic-utils/db')(require('../path'))
const FS = require('fs').promises
const Path = require('path')
const CreateAccount = require('../accounts/createaccount')

const register = (res, json) => {

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
}

module.exports = register