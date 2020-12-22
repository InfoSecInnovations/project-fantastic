import {h} from 'snabbdom/h'
const Alea = require('alea')
import Test from '@infosecinnovations/fantastic-front/view/test'
const ConvertTime = require('@infosecinnovations/fantastic-utils/converttime')
import SuccessTexts from '@infosecinnovations/fantastic-front/view/successtexts'

export default (state, send) => [
  h('h2.panel_title', 'Daily Quests'),
  h('div.scroll spaced', Object.entries(state.quests).map(v => {
    const quest = v[0]
    const date = state.quest_results.date[quest]
    return Test(
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
      date && {success_prefix: `${SuccessTexts[Math.floor(SuccessTexts.length * new Alea(date)())]}!`, type: 'quests'}
    )
  }))
]