import {h} from 'snabbdom/h'
import FollowupButtons from './followupbuttons'
import FollowupResults from './followupresults'
import TimeAgo from '../../../util/timeago'

const format_value = value => {
  if (typeof value === 'object') {
    if (value.date) return TimeAgo(value.date)
  }
  return `${value}`
}

export default (state, action, action_result, node_id, host, loading, send, followups = []) => h('div.result', [
  action_result.label ? h('h4', action_result.label) : undefined,
  ...(action_result.data ? action_result.data.map(v => h('div.item', format_value(v))) : []),
  ...FollowupButtons(state, action, action_result, node_id, host, loading, send, followups),
  ...FollowupResults(state, action, action_result, node_id, host, loading, send, followups)
])