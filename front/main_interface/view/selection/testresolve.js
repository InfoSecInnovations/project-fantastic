import FormatString from '@infosecinnovations/fantastic-utils/formatstring'
import {h} from 'snabbdom/h'

export default (state, send) => {
  const test_obj = state.tests[state.test_resolve.test]
  const action_data = test_obj.pass.failure.action
  const action_obj = state.actions[action_data.path]
  return h('div.scroll_container', h('div.scroll spaced', [
    h('div.item', [
      h('h3', action_obj.name),
      h('div.button', {on: {click: e => send({type: 'run_test_resolve', test_id: state.test_resolve.test_id})}}, 'Run')
    ]),
    // TODO: show function name
    h('pre', FormatString(action_obj.commands[action_data.function || 'run'], action_data.data)),
    action_obj.description ? h('div.item', action_obj.description) : undefined,
  ]))
}