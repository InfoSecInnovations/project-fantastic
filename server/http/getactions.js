const GetAction = require('../util/getpackagedasset')
const ValidateRole = require('./auth/validaterole')
const Abort = require('./abort')

const getActions = (res, req, actions) => {
  console.log('-----------')
  console.log('received http request to get available actions...')
  res.onAborted(() => Abort(res))
  ValidateRole(res, req, 'user')  // TODO: filter actions by role
  .then(valid => {
    if (!valid) return !res.aborted && res.end()
    const action_data = actions
    .map(v => {
      // TODO: filter out invalid scripts and warn the user
      return {...GetAction(v), key: v}
    })
    .reduce((result, v) => ({ 
      ...result, 
      [v.key]: {name: v.name, description: v.description, hosts: v.hosts}
    }), {})
  console.log(`sent metadata for ${Object.keys(action_data).length} actions.`)
  console.log('-----------')
  res.end(JSON.stringify(action_data))
  })
}

module.exports = getActions