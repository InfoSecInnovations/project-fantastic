const GetInput = require('@infosecinnovations/fantastic-utils/getinput')
const ActiveDirectory = require('./activedirectory')
const DPAPI = require('win-dpapi')
const FS = require('fs-extra')

const serviceInit = async () => {
  let username
  let password
  while(true) {
    try {
      username = await GetInput('Enter ActiveDirectory admin username: ')
      while(!username) username = await GetInput('Please enter a valid username: ')
      password = await GetInput('Enter ActiveDirectory admin password: ', true)
      console.log('Connecting...')
      const auth = await ActiveDirectory(username, password).then(ad => ad.authenticate(username, password))
      if (!auth) throw('Invalid Login!')
      break
    }
    catch(err) {
      console.error(err)
    }
  }
  const credentials = `${username}
${password}`
  const buffer = Buffer.from(credentials, 'utf-8')
  const encrypted = DPAPI.protectData(buffer, null, 'LocalMachine')
  await FS.writeFile('ad-auth.cred', encrypted)
}

module.exports = serviceInit