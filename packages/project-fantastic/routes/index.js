const Abort = require('./abort')
const Auth = require('./auth')
const End = require('./end')
const ParseQuery = require('@infosecinnovations/fantastic-utils/parsequery')
const GetHTTPData = require('@infosecinnovations/fantastic-utils/gethttpdata')

const routes = (app, auth_module, get_commands, get_actions, get_scans, get_stories, update_commands, get_config, get_inventory_items) => {

  const createRoute = (method, route, func, {arg, allow_no_user, http_data, callback} = {}) => {
    app[method](route, async (res, req) => {
      Abort(res)
      const header = req.getHeader('cookie')
      const query = ParseQuery(req.getQuery())
      const data = http_data && await GetHTTPData(res)
      Auth(auth_module, header)
      .then(user => {
        if (!allow_no_user && !user) return End(res)
        if (typeof arg === 'function') arg = arg()
        return func.apply(null, [user, res, req, query, arg, data])
      })
      .then(result => callback && callback(result))
    })
  }

  createRoute('get', '/', require('./main'), {allow_no_user: true})
  createRoute('get', '/actions', require('./getactions'), {arg: get_actions})
  createRoute('get', '/commands', require('./getcommands'), {arg: get_commands})
  createRoute('get', '/inventory', require('./getinventoryitems'), {arg: get_inventory_items})
  createRoute('get', '/logs', require('./getlogs'), {arg: auth_module})
  createRoute('get', '/nodes', require('./getnodes'))
  createRoute('get', '/results', require('./getresults'))
  createRoute('get', '/quests', require('./getquests'), {arg: get_scans})
  createRoute('get', '/quest_history', require('./getquesthistory'))
  createRoute('get', '/scans', require('./getscans'), {arg: get_scans})
  createRoute('get', '/scan_history', require('./getscanhistory'))
  createRoute('get', '/user', require('./getuser'))
  createRoute('get', '/user_history', require('./getuserhistory'))
  createRoute('get', '/stories', require('./getstories'), {arg: get_stories})
  createRoute('get', '/story_history', require('./getstoryhistory'))
  createRoute('get', '/favorites', require('./getfavorites'))
  createRoute('get', '/config', require('./getconfig'), {arg: get_config})
  createRoute('get', '/module_info', require('./getmoduleinfo'), {arg: get_config})
  createRoute('get', '/inventory_data', require('./getinventorydata'))
  createRoute('get', '/inventory_rules', require('./getinventoryrules'))

  createRoute('post', '/commands', require('./postcommands'), {arg: get_commands, callback: commands => update_commands(commands)})
  createRoute('post', '/actions', require('./postactions'), {arg: get_actions, http_data: true})
  createRoute('post', '/action_followup', require('./postactionfollowup'), {arg: get_actions, http_data: true})
  createRoute('post', '/scans', require('./postscans'), {arg: get_scans, http_data: true})
  createRoute('post', '/scan_resolve', require('./postscanresolve'))
  createRoute('post', '/quests', require('./postquests'), {arg: get_scans})
  createRoute('post', '/review', require('./postreview'))
  createRoute('post', '/swap_saved', require('./postswapsaved'))
  createRoute('post', '/save', require('./postsave'), {arg: get_stories})
  createRoute('post', '/story_node', require('./poststorynode'), {arg: get_stories})
  createRoute('post', '/favorite', require('./postfavorite'))
  createRoute('post', '/save_search', require('./postsavesearch'))
  createRoute('post', '/inventory_rules', require('./postinventoryrules'), {http_data: true})

  createRoute('del', '/inventory_rules', require('./deleteinventoryrules'))

  app.get('/logout', (res, req) => require('./auth/logout')(res, req, auth_module))
  app.get('/*', require('./files'))
}

module.exports = routes