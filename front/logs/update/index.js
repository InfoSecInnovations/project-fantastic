const Common = require('../../common/update')

const update = (state, action) => {
  state = Common(state, action)
  if (action.type == 'logs') state.logs = action.logs
  return state
}

module.exports = update