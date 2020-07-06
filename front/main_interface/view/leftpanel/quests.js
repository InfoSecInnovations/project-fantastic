const H = require('snabbdom/h').default
const Alea = require('alea')
const TestEntry = require('./testentry')
const ConvertTime = require('fantastic-utils/converttime')

const success_texts = [
  'Well done',
  'Congratulations',
  'Good job'
]

const quests = (state, send) => H('div.scroll_container.panel', [
  H('div.item', [
    H('div.title', 'Quests')
  ]),
  H('div.scroll', Object.entries(state.quests).map(v => {
    const quest = v[0]
    const date = state.quest_results.date[quest]
    return TestEntry(
      state, 
      send, 
      v[1],
      {
        get: () => v[1].parameters, 
        result: () => H('div.item', H('a', {
          on: {click: e => {
            send({type: 'get_nodes', nodes: state.quest_results.nodes[quest], date: state.quest_results.date[quest] - ConvertTime(state.quests[quest].selection.age), max_date: state.quest_results.date[quest]})
          }}
        }, 'Show hosts scanned by quest'))
      }, 
      state.quest_results.data[quest],
      date,
      v[1].parameters,
      state.quest_results.status[quest] === 'loading',
      {type: 'run_quest', quest},
      date && {success_prefix: `${success_texts[Math.floor(success_texts.length * new Alea(date)())]}!`}
    )
  }))
])

module.exports = quests