const getAction = action => {
  const split = action.split('/')
  const mod = require(`../config/node_modules/${split[0]}`)
  return mod[split[1]]
}

module.exports = getAction