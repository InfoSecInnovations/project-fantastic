const HasRole = require('fantastic-utils/hasrole')
const Auth = require('./auth')
const Abort = require('./abort')
const GetPackagedData = require('../util/getpackageddata')

const getActions = (res, req, actions) => {
  console.log('-----------')
  console.log('received http request to get available actions...')
  res.onAborted(() => Abort(res))
  Auth(req.getHeader('cookie'))
  .then(async user => {
    if (!user) return !res.aborted && res.end()
    const action_data = await Promise.all(actions
      .map(v => GetPackagedData(v).then(a => ({...a, key: v})))
    )
    .then(actions => actions.filter(v => HasRole(user, v.role)) // TODO: filter out invalid scripts and warn the user
      .reduce((result, v) => ({ 
        ...result, 
        [v.key]: {name: v.name, description: v.description, hosts: v.hosts}
      }), {})
    )  
    console.log(`sent metadata for ${Object.keys(action_data).length} actions.`)
    console.log('-----------')
    res.end(JSON.stringify(action_data))
  })
}

module.exports = getActions