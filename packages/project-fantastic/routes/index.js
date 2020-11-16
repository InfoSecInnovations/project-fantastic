const routes = (app, get_commands, get_actions, get_tests, update_commands) => {
  app.get('/', require('./main'))
  app.get('/*', require('./files'))
  app.get('/nodes', require('./getnodes'))
  app.get('/commands', (res, req) => require('./getcommands')(res, req, get_commands()))
  app.post('/commands', (res, req) => {
    require('./postcommands')(res, req, get_commands())
    .then(commands => update_commands(commands))
  })
  app.get('/actions', (res, req) => require('./getactions')(res, req, get_actions()))
  app.post('/actions', (res, req) => require('./postactions')(res, req, get_actions()))
  app.post('/action_followup', (res, req) => require('./postactionfollowup')(res, req, get_actions()))
  app.get('/results', require('./getresults'))
  app.get('/quests', (res, req) => require('./getquests')(res, req, get_tests()))
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
  app.get('/logs', require('./getlogs'))
}

module.exports = routes