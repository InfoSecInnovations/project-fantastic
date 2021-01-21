import FormatString from '@infosecinnovations/fantastic-utils/formatstring'
import {h} from 'snabbdom/h'

const action_view = (state, data) =>  {
  const action_obj = state.actions[data.path]
  return [
    h('h4', `${action_obj.name}${data.function ? `: ${action_obj.names[data.function]}` : ''}`),
    h('pre', FormatString(action_obj.commands[data.function || 'run'], data.data))
  ]
}

export default (state, send) => {
  const test_obj = state.tests[state.test_resolve.test]
  const action_data = test_obj.pass.failure.action
  return h('div.scroll_container', h('div.scroll spaced', [
    h('div.item', [
      h('h3', `Resolve issues found by ${test_obj.name}`),
      state.test_results.status[state.test_resolve.test] == 'loading' ? h('div.button disabled', 'Running...') :
      h('div.button', {on: {click: e => send({type: 'run_test_resolve', test_id: state.test_resolve.test_id, test: state.test_resolve.test})}}, 'Run')
    ]),
    ...(Array.isArray(action_data) ? action_data.map(data => action_view(state, data)).flat() : action_view(state, action_data))
    // TODO: show which quest/story we're resolving
  ]))
}