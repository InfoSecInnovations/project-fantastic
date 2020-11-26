const BCrypt = require('bcrypt')
const GenerateID = require('@infosecinnovations/fantastic-utils/generateid')
const GenerateBinaryID = require('@infosecinnovations/fantastic-utils/generatebinaryid')
const {insert} = require('../db')
const GetConfig = require('../utils/getconfig')

const createAccount = (username, password, role) => GetConfig()
  .then(res => BCrypt.hash(password, res.salt_rounds))
  .then(async res => {
    const id = await GenerateID()
    await insert('users', {user_id: GenerateBinaryID(), username, password: res, session_id: id, role})
    return id
  })

module.exports = createAccount