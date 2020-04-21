const H = require('snabbdom/h').default
const HostString = require('../../../common/util/hoststring')
const TimeAgo = require('../../../common/util/timeago')
const Alea = require('alea')
const FormatString = require('fantastic-utils/formatstring')

const success_texts = [
  'Well done',
  'Congratulations',
  'Good job'
]

const failed = (state, send, quest) => {
  const quest_data = state.quests[quest]
  const failed_results = state.quest_results.data[quest].filter(r => r.result != quest_data.pass.condition)
  const failed_nodes = failed_results.map(v => state.nodes.findIndex(n => n.node_id === v.node_id))
  return H('a.item', 
    {
      on: {click: [
        [send, {type: 'vis_select', nodes: failed_nodes}],
        [send, {type: 'select', nodes: failed_nodes}]
      ]}
    }, 
    `${failed_results.length} systems ${FormatString(quest_data.pass.failure, quest_data.parameters)}`
  )
}

const quest = (state, send, quest) => {
  const data = state.quests[quest]
  const results = state.quest_results.date[quest] > Date.now() - 1000 * 60 * 60 * 24 && state.quest_results.data[quest] // TODO: maybe we want to be able to define a custom maximum result age
  const pass = results && results.every(r => r.result == data.pass.condition)
  let image = 'new'
  if (results) image = pass ? 'success' : 'failure'
  return H('div.scroll_item', [
    H('div.item', [
      H('div.subtitle', data.name),
      H('img.icon', {attrs: {src: `images/${image}.svg`}})
    ]),
    data.description ? H('div.item', data.description) : undefined,
    H('div.targets', [H('b', 'Valid targets:'), ` ${data.hosts.map(HostString).join(', ')}.`]),
    state.quest_results.status[quest] === 'loading' ?
    H('div.play.loading', [
      H('div.item', 'Gathering results...')
    ]) :
    H('div.play', {on: {click: [send, {type: 'run_quest', quest}]}}, [
      H('div.item', 'Start'),
      H('img.play_button', {attrs: {src: 'images/triangle.svg'}})
    ]),
    ...(results ?
    [
      H('div.subtitle', `Results from ${TimeAgo(state.quest_results.date[quest])}`),
      H('div.item', `${results.length} systems scanned`),
      pass ?
      H('div.item', `${success_texts[Math.floor(success_texts.length * new Alea(state.quest_results.date[quest])())]}! ${FormatString(data.pass.success, data.parameters)}`) :
      failed(state, send, quest)
    ] : [])
  ])
}

const quests = (state, send) => H('div.scroll_container.panel', [
  H('div.item', [
    H('div.title', 'Quests')
  ]),
  H('div.scroll', Object.keys(state.quests).map(v => quest(state, send, v)))
])

module.exports = quests