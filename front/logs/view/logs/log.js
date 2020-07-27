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

const test_results = (data, results) => {
  return {
    pass: results.every(v => v.result == data.pass.condition),
    failed: results.filter(v => v.result != data.pass.condition)
  }
}

const parameters = obj => {
  try {
    const json = JSON.parse(obj)
    return h('div.parameters', [
      h('div', 'Parameters:'),
      h('ul', Object.entries(json).map(v => h('li', `${v[0]}: ${v[1]}`)))
    ])
  }
  catch(e) {
    return
  }
}

const log_details = (state, log) => {
  if (log.event_type == 'action') {
    return [
      h('div.log_details', [
        log.function != 'run' ? h('div', `Followup action: ${log.function}`) : undefined,
        h('div', `Target node: ${log.node_id}`)
      ]),
      parameters(log.data)
    ]
  }
  if (log.event_type == 'test') {
    const results = test_results(state.tests[log.test], JSON.parse(log.results))
    return [
      h('div.log_details', results.pass ? 'All nodes passed' : `${results.failed.length} nodes failed`),
      parameters(log.parameters)
    ]
  }
  if (log.event_type == 'quest') {
    const results = test_results(state.quests[log.quest], JSON.parse(log.results))
    return [h('div.log_details', results.pass ? 'All nodes passed' : `${results.failed.length} nodes failed`)]
  }
  if (log.event_type == 'command') {
    return [h('div.log_details', `${log.status ? 'Enabled' : 'Disabled'}`)]
  }
}

export default (state, send, log) => h('div.log', [
  h('div.log_name', [h('b', headers[log.event_type]), ' ' ,log_name(state, log)]),
  h('div.log_details', [
    h('div', log.user.username),
    h('div', new Date(log.date).toString())
  ]),
  ...log_details(state, log)
])