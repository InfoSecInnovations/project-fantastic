import {h} from 'snabbdom/h'
import TimeAgo from '../../../util/timeago'

export default (state, action, action_result, node_id, host, loading, send, followups, result_func) => action_result.followups ? Object.values(action_result.followups)
  .filter(v => v.result)
  .map(v => {
    return h('div', [
      h('div.result_time', [
        h('h4', v.label || (typeof v.enabled == 'boolean' && (v.enabled ? 'Enable' : 'Disable')) || state.actions[action].names[v.function]),
        h('div.time', [
          ` Results from ${TimeAgo(v.date)}`, 
          h(`div.foldout fas fa-${v.foldout ? 'chevron-down' : 'chevron-right'} fa-fw`, {
            on: {click: [send, {
              type: 'followup_foldout',
              action,
              node_id,
              hostname: host,
              followups: [...followups, {followup: v.function, label: action_result.label}],
              value: !v.foldout
            }]}
          })
        ])
      ]),
      ...(v.foldout ? v.result.map(r => 
        result_func(state, action, r, node_id, host, loading || v.status === 'loading', send, [...followups, {followup: v.function, label: action_result.label}])
      ) : [])
    ])
  }).flat() : []