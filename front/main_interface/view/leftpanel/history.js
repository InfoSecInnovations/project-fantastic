const H = require('snabbdom/h').default

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

const log_content = (state, log) => {
  if (log.event_type == 'test') {
    const parameters = JSON.parse(log.parameters)
    return H('div.parameters', [
      H('div.item', 'Parameters used:'),
      H('ul', Object.entries(parameters).map(v => H('li', `${v[0]}: ${v[1]}`)))
    ])
  }
  if (log.event_type == 'action' && log.function != 'run') return H('div', `Followup action: ${state.actions[log.action].names[log.function]}`)
}

const history = (state, send) => H('div.scroll_container.panel', [
  H('div.item', [
    H('div.title', 'History')
  ]),
  H('div.scroll', state.history.results.map(v => H('div.scroll_item', [
    H('div.history_title', [
      H('div.subtitle', headers[v.event_type]),
      H('div', log_name(state, v))
    ]),
    H('div.item', log_content(state, v))
  ])))
])

module.exports = history