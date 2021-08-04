const GetInput = require('@infosecinnovations/fantastic-utils/getinput')
const ActiveDirectory = require('./activedirectory')

const serviceInit = async () => {
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
}

module.exports = serviceInit