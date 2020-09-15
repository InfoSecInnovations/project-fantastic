const HasRole = require('fantastic-utils/hasrole')
const Auth = require('./auth')
const Abort = require('./abort')
const GetPackagedData = require('../util/getpackageddata')

const getActions = (res, req, actions) => {
  console.log('getActions: received http request to get available actions...')
  Abort(res)
  Auth(req.getHeader('cookie'))
  .then(async user => {
    if (!user) return !res.aborted && res.end()
    const action_data = await Promise.all(actions
      .map(v => GetPackagedData(v, 'actions').then(a => ({...a, key: v})))
    )
    .then(actions => actions.filter(v => HasRole(user, v.role)) // TODO: filter out invalid scripts and warn the user
      .reduce((result, v) => ({ 
        ...result, 
        [v.key]: {
          name: v.name, 
          description: v.description, 
          hosts: v.hosts, 
          commands: Object.entries(v.functions).reduce((result, v) => ({...result, [v[0]]: v[1].command}), {}),
          names: Object.entries(v.functions).reduce((result, v) => ({...result, [v[0]]: v[1].name || v[0]}), {}),
          filters: Object.entries(v.functions).reduce((result, v) => ({...result, [v[0]]: v[1].result && v[1].result.filter}), {})
        }
      }), {})
    )  
    console.log(`getActions: sent metadata for ${Object.keys(action_data).length} actions.`)

    res.end(JSON.stringify(action_data))
  })
}

module.exports = getActions