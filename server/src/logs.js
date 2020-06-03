import { h, app } from "https://unpkg.com/hyperapp"

// ---- EFFECT

const fetch_json = (dispatch, options) =>
  fetch(options.url)
  .then(response => response.json())
  .then(data => dispatch(options.onresponse, data))
  .catch(() => dispatch(options.onresponse, {}))

const assign = (state, key, data) => ({...state, [key]: data})

const init_effects = ['logs', 'actions', 'tests', 'quests'].map(v => [
  fetch_json,
  {
    url: `/${v}`,
    onresponse: (state, data) => assign(state, v, data)
  }
])

const change_page = (state, page) => [
  {...state, page},
  [
    fetch_json,
    {
      url: `/logs?page=${page}`,
      onresponse: (state, data) => ({...state, logs: data})
    }
  ]
]

// ---- VIEW

const headers = {
  action: 'Run Action',
  test: 'Run Test',
  quest: 'Run Quest'
}

const test_results = (data, results) => {
  return {
    pass: results.every(v => v.result == data.pass.condition),
    failed: results.filter(v => v.result != data.pass.condition)
  }
}

const log_details = (state, log) => {
  if (log.event_type == 'action') {
    if (log.function == 'run') return
    return h('div', {class: 'log_details'}, `Followup action: ${log.function}`)
  }
  if (log.event_type == 'test') {
    const results = test_results(state.tests[log.test], JSON.parse(log.results))
    return h('div', {class: 'log_details'}, results.pass ? 'All nodes passed' : `${results.failed.length} nodes failed`)
  }
  if (log.event_type == 'quest') {
    const results = test_results(state.quests[log.quest], JSON.parse(log.results))
    return h('div', {class: 'log_details'}, results.pass ? 'All nodes passed' : `${results.failed.length} nodes failed`)
  }
}

const log_name = (state, log) => {
  if (log.event_type == 'action') return state.actions[log.action].name
  if (log.event_type == 'test') return state.tests[log.test].name
  if (log.event_type == 'quest') return state.quests[log.quest].name
}

const log_view = (state, log) => h('div', {class: 'log'}, [
  h('div', {class: 'log_details log_name'}, [h('b', {}, headers[log.event_type]), log_name(state, log)]),
  h('div', {class: 'log_details'}, [
    h('div', {}, log.user.username),
    h('div', {}, new Date(log.date).toString())
  ]),
  log_details(state, log)
])

const controls = state => h('div', {class: 'controls'}, [
  h('div', {
    class: 'foldout fas fa-step-backward fa-fw',
    onClick: [change_page, 0]
  }),
  h('div', {
    class: 'foldout fas fa-chevron-left fa-fw',
    onClick: [change_page, state.page - 1]
  }),
  h('div', {
    class: 'foldout fas fa-chevron-right fa-fw',
    onClick: [change_page, state.page + 1]
  })
])

// ---- RUN

app({
  node: document.getElementById('logs'),
  init: [
    {
      page: 0
    }, 
    init_effects
  ],
  view: state => {
    if (!state.actions || !state.quests || !state.tests) return
    if (state.logs) return h('div', {id: 'logs'}, [
      h('div', {class: 'search'}, [
        controls(state)
      ]),
      h('div', {}, state.logs.map(v => log_view(state, v)))
    ])
  }
})