import {h} from 'snabbdom/h'

const headers = {
  action: 'Run Action',
  test: 'Run Test',
  quest: 'Run Quest',
  command: 'Set Host Data Command'
}

const log_name = (state, log) => {
  if (log.event_type == 'action') return state.actions[log.action].name
  if (log.event_type == 'test') return state.tests[log.test].name
  if (log.event_type == 'quest') return state.quests[log.quest].name
  if (log.event_type == 'command') return state.commands[log.command].name
}

const log = (state, send, data) => h('div.log', [
  h('div.log_details log_name', [h('b', {}, headers[data.event_type]), log_name(state, data)]),
])

module.exports = log