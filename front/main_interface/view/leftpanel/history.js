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
    return H('div.parameters history_item', [
      H('div.item', 'Parameters used:'),
      H('ul', Object.entries(parameters).map(v => H('li', `${v[0]}: ${v[1]}`)))
    ])
  }
  if (log.event_type == 'command') {
    return H('div.item', log.status ? 'Enabled' : 'Disabled')
  }
}

const history = (state, send) => H('div.scroll_container.panel', [
  H('div.item', [
    H('div.title', 'History')
  ]),
  H('div.scroll', state.history.results.map(v => H('div.scroll_item history_item', [
    H('div.history_title', [
      H('div.subtitle history_item', headers[v.event_type]),
      H('div.subtitle unbold history_item', log_name(state, v))
    ]),
    H('div.item', log_content(state, v)),
    H('div.item', [
      H('div.play history_item', {on: {click: () => send({type: 'favorite', history_id: v.history_id})}}, [
        H('div.item', 'Favorite'),
        H('span.fas fa-star fa-fw play_button')
      ]),
      H('div.play history_item', {on: {click: () => {
        if (v.event_type == 'test') {
          send({type: 'run_test', test: v.test, parameters: JSON.parse(v.parameters)})
          send({type: 'left_panel_state', state: 'tests'})
        }
        if (v.event_type == 'quest') {
          send({type: 'run_quest', quest: v.quest})
          send({type: 'left_panel_state', state: 'quests'})
        }
        if (v.event_type == 'command') {
          send({type: 'enable_command', command: v.command, enabled: v.status ? true : false})
          send({type: 'left_panel_state', state: 'host_data'})
        }
      }}}, [
        H('div.item', 'Run Again'),
        H('span.fas fa-play fa-fw play_button')
      ])
    ])
  ])))
])

module.exports = history