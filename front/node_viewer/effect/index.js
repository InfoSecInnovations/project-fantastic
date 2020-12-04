import Common from '@infosecinnovations/fantastic-front/effect'
import LoadNodeResults from '@infosecinnovations/fantastic-front/effect/loadnoderesults'
import FetchScripts from '@infosecinnovations/fantastic-front/effect/fetchscripts'
import FlexSearch from '@infosecinnovations/fantastic-front/effect/flexsearch'

export default (state, action, send) => {
  Common(state, action, send)
  FlexSearch(state, action, send)
  if (action.type == 'init') FetchScripts(send, 'actions')
  if (action.type == 'node_data') LoadNodeResults([action.data], send)
}