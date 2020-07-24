const FetchScripts = require('../../common/effect/fetchscripts')
const GenerateQuery = require('../../common/effect/generatequery')

const effect = (state, action, send) => {
  if (action.type == 'init') {
    ['actions', 'tests', 'quests', 'commands'].forEach(v => FetchScripts(send, v))
    send({type: 'page', page: 0})
  }
  if (action.type == 'page') {
    fetch(`/logs?${GenerateQuery({
      ...state.search, 
      event_types: Object.entries(state.search.event_types).filter(v => v[1]).map(v => v[0]), 
      ...(action.page && {page: action.page})})}`)
    .then(res => res.json())
    .then(res => send({type: 'logs', logs:res}))
  }
}

module.exports = effect