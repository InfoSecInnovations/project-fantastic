const getActions = (res, req, actions) => {
  console.log('-----------')
  console.log('received http request to get available actions...')
  const action_data = actions
    .map(v => {
      const source = require(`../config/actions/${v}`)
      // TODO: filter out invalid scripts and warn the user
      return {...source, filename: v}
    })
    .reduce((result, v) => ({ 
      ...result, 
      [v.filename]: {name: v.name || v.filename.slice(0, v.filename.lastIndexOf('.js')), description: v.description, hosts: v.hosts}
    }), {})
  console.log(`sent metadata for ${Object.keys(action_data).length} actions.`)
  console.log('-----------')
  res.end(JSON.stringify(action_data))
}

module.exports = getActions