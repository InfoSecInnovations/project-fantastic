import FormatString from '@infosecinnovations/fantastic-utils/formatstring'
import {h} from 'snabbdom/h'

export default (state, send) => {
  const test_obj = state.tests[state.test_resolve.test]
  const action_data = test_obj.pass.failure.action
  const action_obj = state.actions[action_data.path]
  return h('div.scroll_container', h('div.scroll spaced', [
    h('div.item', [
      h('h3', `${action_obj.name}${action_data.function ? `: ${action_obj.names[action_data.function]}` : ''}`),
      state.test_results.status[state.test_resolve.test] == 'loading' ? h('div.button disabled', 'Running...') :
      h('div.button', {on: {click: e => send({type: 'run_test_resolve', test_id: state.test_resolve.test_id, test: state.test_resolve.test})}}, 'Run')
    ]),
    h('pre', FormatString(action_obj.commands[action_data.function || 'run'], action_data.data)),
    h('div', `Run this to resolve issues found by ${test_obj.name}`)
    // TODO: show which quest/story we're resolving
  ]))
}