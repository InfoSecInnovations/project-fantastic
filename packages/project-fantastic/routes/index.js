const Abort = require('./abort')
const Auth = require('./auth')
const End = require('./end')

const routes = (app, auth_module, get_commands, get_actions, get_tests, update_commands) => {

  const createRoute = (method, route, func, args, allow_no_user) => {
    app[method](route, (res, req) => {
      Abort(res)
      const header = req.getHeader('cookie')
      Auth(auth_module, header)
      .then(user => {
        if (!allow_no_user && !user) return End(res)
        if (typeof args === 'function') args = args()
        func.apply(null, [user, res, req, ...(args || [])])
      })
    })
  }

  createRoute('get', '/', require('./main'), null, true)
  createRoute('get', '/actions', require('./getactions'), get_actions)
  createRoute('get', '/commands', require('./getcommands'), get_commands)
  createRoute('get', '/logs', require('./getlogs'), auth_module)
  createRoute('get', '/nodes', require('./getnodes'))
  createRoute('get', '/results', require('./getresults'))
  createRoute('get', '/quests', require('./getquests'), get_tests)

  app.get('/*', require('./files'))
  app.post('/commands', (res, req) => {
    require('./postcommands')(res, req, get_commands())
    .then(commands => update_commands(commands))
  })
  app.post('/actions', (res, req) => require('./postactions')(res, req, get_actions()))
  app.post('/action_followup', (res, req) => require('./postactionfollowup')(res, req, get_actions()))
  app.post('/quests', (res, req) => require('./postquests')(res, req, get_tests()))
  app.get('/quest_history', require('./getquesthistory'))
  app.get('/tests', (res, req) => require('./gettests')(res, req, get_tests()))
  app.post('/tests', (res, req) => require('./posttests')(res, req, get_tests()))
  app.post('/review', require('./postreview'))
  app.get('/test_history', require('./gettesthistory'))
  app.get('/logout', require('./auth/logout'))
  app.get('/user', require('./getuser'))
  app.get('/user_history', require('./getuserhistory'))
  app.post('/swap_favorites', require('./postswapfavorites'))
  app.post('/favorites', require('./postfavorites'))
}

module.exports = routes