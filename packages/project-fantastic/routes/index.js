const Abort = require('./abort')
const Auth = require('./auth')
const End = require('./end')
const ParseQuery = require('@infosecinnovations/fantastic-utils/parsequery')

const routes = (app, auth_module, get_commands, get_actions, get_tests, update_commands) => {

  const createRoute = (method, route, func, arg, allow_no_user) => {
    app[method](route, (res, req) => {
      Abort(res)
      const header = req.getHeader('cookie')
      const query = ParseQuery(req.getQuery())
      Auth(auth_module, header)
      .then(user => {
        if (!allow_no_user && !user) return End(res)
        if (typeof arg === 'function') arg = arg()
        func.apply(null, [user, res, req, query, arg])
      })
    })
  }

  createRoute('get', '/', require('./main'), null, true)

  app.get('/*', require('./files'))
  app.get('/logout', require('./auth/logout'))

  createRoute('get', '/actions', require('./getactions'), get_actions)
  createRoute('get', '/commands', require('./getcommands'), get_commands)
  createRoute('get', '/logs', require('./getlogs'), auth_module)
  createRoute('get', '/nodes', require('./getnodes'))
  createRoute('get', '/results', require('./getresults'))
  createRoute('get', '/quests', require('./getquests'), get_tests)
  createRoute('get', '/quest_history', require('./getquesthistory'))
  createRoute('get', '/tests', require('./gettests'), get_tests)
  createRoute('get', '/test_history', require('./gettesthistory'))
  createRoute('get', '/user', require('./getuser'))
  createRoute('get', '/user_history', require('./getuserhistory'))

  createRoute('post', '/commands', (...args) => require('./postcommands').apply(null, args).then(commands => update_commands(commands)), get_commands)

  app.post('/actions', (res, req) => require('./postactions')(res, req, get_actions()))
  app.post('/action_followup', (res, req) => require('./postactionfollowup')(res, req, get_actions()))
  app.post('/quests', (res, req) => require('./postquests')(res, req, get_tests()))
  app.post('/tests', (res, req) => require('./posttests')(res, req, get_tests()))
  app.post('/review', require('./postreview'))
  app.post('/swap_favorites', require('./postswapfavorites'))
  app.post('/favorites', require('./postfavorites'))
}

module.exports = routes