const H = require('snabbdom/h').default
const Alea = require('alea')
const TestResult = require('./testresult')

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
    return TestResult(
      state, 
      send, 
      v[1], 
      state.quest_results.data[quest],
      state.quest_results.date[quest],
      state.quest_results.status[quest] === 'loading',
      {type: 'run_quest', quest},
      `${success_texts[Math.floor(success_texts.length * new Alea(state.quest_results.date[quest])())]}!`
    )
  }))
])

module.exports = quests