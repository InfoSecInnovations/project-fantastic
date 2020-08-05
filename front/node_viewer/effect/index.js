import Common from '../../common/effect'
import LoadNodeResults from '../../common/effect/loadnoderesults'
import FetchScripts from '../../common/effect/fetchscripts'

export default (state, action, send) => {
  Common(state, action, send)
  if (action.type == 'init') FetchScripts(send, 'actions')
  if (action.type == 'node_data') LoadNodeResults([action.data], send)
}