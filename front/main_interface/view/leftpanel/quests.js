import {h} from 'snabbdom/h'
const Alea = require('alea')
import TestEntry from './testentry'
const ConvertTime = require('@infosecinnovations/fantastic-utils/converttime')

const success_texts = [
  'Well done',
  'Congratulations',
  'Good job'
]

export default (state, send) => h('div.scroll_container', [
  h('h2.panel_title', 'Quests'),
  h('div.scroll spaced', Object.entries(state.quests).map(v => {
    const quest = v[0]
    const date = state.quest_results.date[quest]
    return TestEntry(
      state, 
      send, 
      quest,
      v[1],
      {
        get: () => v[1].parameters || {}, 
        result: () => state.quest_results.nodes[quest] && h('div.link', {
          on: {click: e => {
            send({type: 'get_nodes', nodes: state.quest_results.nodes[quest], date: state.quest_results.date[quest] - ConvertTime(state.quests[quest].selection.age), max_date: state.quest_results.date[quest]})
          }}
        }, `${state.quest_results.nodes[quest].length} hosts scanned`)
      }, 
      state.quest_results.data[quest],
      date,
      v[1].parameters,
      state.quest_results.approval[quest],
      state.quest_results.status[quest] === 'loading',
      {type: 'run_quest', quest},
      date && {success_prefix: `${success_texts[Math.floor(success_texts.length * new Alea(date)())]}!`, is_quest: true}
    )
  }))
])