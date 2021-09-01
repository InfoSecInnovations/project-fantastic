const Serve = require('./http/serve')
const GetInput = require('@infosecinnovations/fantastic-utils/getinput')
const ActiveDirectory = require('./activedirectory')
const DPAPI = require('win-dpapi')
const FS = require('fs-extra')

let username
let password

const initializeRoutes = async app => {

  // if the credentials file from running the service exists then we should use that
  const file = await FS.pathExists('ad-auth.cred').then(exists => exists ? FS.readFile('ad-auth.cred') : null)
  if (file) {
    const data = DPAPI.unprotectData(file, null, 'LocalMachine').toString().split(/\r?\n/)
    username = data[0]
    password = data[1]
  }
  // if not ask the user until they supply a valid login
  else {
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
  app.get('/auth', require('./http/auth'))
  app.get('/auth/myaccount', (res, req) => require('./http/myaccount')(res, req, {username, password}))
  app.post('/auth/login', (res, req) => require('./http/login')(res, req, {username, password}))
  app.get('/auth/logout', require('./http/logout'))
  app.get('/auth/public/*', (res, req) => {
    const url = req.getUrl()
    const split = url.split('/')
    const path = split[split.length - 1]
    Serve(`public/${path}`, res)
  })
}

module.exports = {
  initializeRoutes, 
  configure: require('./configure'), 
  invalidate: require('./accounts/invalidate'), 
  verify: session_id => require('./accounts/verify')(session_id, {username, password}), 
  getByID: require('./accounts/getbyid'), 
  getByUsername: require('./accounts/getbyusername'),
  serviceInit: require('./serviceinit'),
  serviceRemove: require('./serviceremove')
}