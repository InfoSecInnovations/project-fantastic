const Common = require('../../common/effect')
const LoadNodeResults = require('../../common/effect/loadnoderesults')

const effect = (state, action, send) => {
  Common(state, action, send)
  if (action.type == 'node_data') LoadNodeResults(action.data, send)
}

module.exports = effect