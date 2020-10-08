import {h} from 'snabbdom/h'
import FollowupButtons from './followupbuttons'
import FollowupResults from './followupresults'
import ReviewIcon from '../../reviewicon'
import FormatValue from './formatvalue'

const result = (state, action, action_result, node_id, host, loading, filter, send, followups = []) => h('div.result', [
  h('div.item', [
    action_result.label ? h('h4', action_result.label) : undefined, 
    ReviewIcon(
      !filter ? 'none'
      : action_result.pass ? 'pass'
      : 'fail',
      state.actions[action].filters[followups.length ? followups[followups.length - 1].followup : 'run']
    )
  ]),
  action_result.data ? h('div', action_result.data.map(v => h('div', FormatValue(v)))) : undefined,
  ...FollowupButtons(state, action, action_result, node_id, host, loading, send, followups),
  ...FollowupResults(state, action, action_result, node_id, host, loading, send, followups, result)
])

export default result