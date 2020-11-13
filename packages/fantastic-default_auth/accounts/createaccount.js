const BCrypt = require('bcrypt')
const GenerateID = require('@infosecinnovations/fantastic-utils/generateid')
const {insert} = require('../db')
const GetConfig = require('../utils/getconfig')

const createAccount = (username, password, role) => GetConfig()
  .then(res => BCrypt.hash(password, res.salt_rounds))
  .then(async res => {
    const id = await GenerateID()
    await insert('users', {username, password: res, session_id: id, role})
    return id
  })

module.exports = createAccount