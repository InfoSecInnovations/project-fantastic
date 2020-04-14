const H = require('snabbdom/h').default
const HostString = require('../../../common/util/hoststring')
const TimeAgo = require('../../../common/util/timeago')
const Alea = require('alea')

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
    `${failed_results.length} systems ${quest_data.pass.failure}`
  )
}

const quests = (state, send) => H('div.scroll_container.panel', [
  H('div.item', [
    H('div.title', 'Quests')
  ]),
  H('div.scroll', Object.entries(state.quests).map(v => H('div.scroll_item', [
    H('div.item', [
      H('div.subtitle', v[1].name),
    ]),
    v[1].description ? H('div.item', v[1].description) : undefined,
    H('div.targets', [H('b', 'Valid targets:'), ` ${v[1].hosts.map(HostString).join(', ')}.`]),
    state.quest_results.status[v[0]] === 'loading' ?
    H('div.play.loading', [
      H('div.item', 'Gathering results...')
    ]) :
    H('div.play', {on: {click: [send, {type: 'run_quest', quest: v[0]}]}}, [
      H('div.item', 'Start'),
      H('img.play_button', {attrs: {src: 'images/triangle.svg'}})
    ]),
    ...(state.quest_results.data[v[0]] ?
    [
      H('div.subtitle', `Results from ${TimeAgo(state.quest_results.date[v[0]])}`),
      H('div.item', `${state.quest_results.data[v[0]].length} systems scanned`),
      state.quest_results.data[v[0]].find(r => r.result != v[1].pass.condition) ?
      failed(state, send, v[0]) :
      H('div.item', `${success_texts[Math.floor(success_texts.length * new Alea(state.quest_results.date[v[0]])())]}! ${v[1].pass.success}`)
    ] : [])
  ])))
])

module.exports = quests