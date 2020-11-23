const Serve = require('./http/serve')
const GetInput = require('@infosecinnovations/fantastic-utils/getinput')
const ActiveDirectory = require('./activedirectory')

const initializeRoutes = async app => {
  while(true) {
    try {
      let username
      username = await GetInput('Enter ActiveDirectory admin username: ')
      while(!username) username = await GetInput('Please enter a valid username: ')
      let password
      password = await GetInput('Enter ActiveDirectory admin password: ', true)
      await ActiveDirectory(username, password)
      break
    }
    catch(err) {
      console.error(err)
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
  verify: require('./accounts/verify'), 
  getByID: require('./accounts/getbyid'), 
  getByUsername: require('./accounts/getbyusername')
}