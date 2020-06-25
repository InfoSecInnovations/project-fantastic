const LoadNodeResults = require('../../common/effect/loadnoderesults')
const LoadHistory = require('./loadhistory')
const Vis = require('./vis')

const nodes = (state, send) => {
  send({type: 'clear_selection'})
  send({type: 'loading', value: false})
  LoadNodeResults(state.nodes, send)
  LoadHistory(send)
  Vis(state, send)
}

module.exports = nodes