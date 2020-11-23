const {get, init} = require('./db')
const GetInput = require('@infosecinnovations/fantastic-utils/getinput')
const CreateAccount = require('./accounts/createaccount')

const configure = async () => {
  await init()
  const row = await get({table: 'users', columns: ['user_id'], conditions: {columns: {role: 'admin'}}})
  if (!row) {
    let username = await GetInput('Please enter admin account username: ')
    while (!username) username = await GetInput('Please enter a valid username: ')
    let password
    let password_check
    let prefix
    while (!password || password != password_check) {
      password = await GetInput(`${prefix ? `${prefix}\n` : ''}Please enter admin password: `, true)
      if (!password) {
        prefix = 'This is not a valid password!'
        continue
      }
      password_check = await GetInput('Confirm password: ', true)
      prefix = "Passwords didn't match!"
    }
    await CreateAccount(username, password, 'admin')
  }
}

module.exports = configure