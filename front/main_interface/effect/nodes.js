const LoadNodeResults = require('../../common/effect/loadnoderesults')
import LoadHistory from './loadhistory'
import Vis from './vis'

export default (state, send) => {
  send({type: 'clear_selection'})
  send({type: 'loading', value: false})
  LoadNodeResults(state.nodes, send)
  LoadHistory(send)
  Vis(state, send)
}