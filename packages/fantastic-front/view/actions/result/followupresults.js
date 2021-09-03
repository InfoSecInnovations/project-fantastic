import {h} from 'snabbdom/h'
import TimeAgo from '../../../util/timeago'

export default (state, action, action_result, node_id, host, loading, send, followups, result_func) => {
  if (!action_result.followups) return []
  return Object.values(action_result.followups)
  .filter(v => v.result)
  .map(v => {
    const result_view = () => {
      if (!v.foldout) return []
      if (v.result.error) return [h('div.result', h('div.error', v.result.error))]
      return v.result
      .map(r => result_func(state, action, r, node_id, host, loading || v.status === 'loading', v.filter, send, [...followups, {followup: v.function, label: action_result.label}]))
    }
    return h('div', [
      h('div.result_time followup', {
        on: {click: e => send({
          type: 'followup_foldout',
          action,
          node_id,
          hostname: host,
          followups: [...followups, {followup: v.function, label: action_result.label}],
          value: !v.foldout
        })}
      }, [
        h('h4', v.label || (typeof v.enabled == 'boolean' && (v.enabled ? 'Enable' : 'Disable')) || state.actions[action].names[v.function]),
        h('div.time', [
          ` Results from ${TimeAgo(v.date)}`, 
          h(`div.foldout fas fa-${v.foldout ? 'chevron-down' : 'chevron-right'} fa-fw`)
        ])
      ]),
      ...(result_view())
    ])
  }).flat()
}