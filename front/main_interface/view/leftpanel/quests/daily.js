import {h} from 'snabbdom/h'
const Alea = require('alea')
import SuccessTexts from '@infosecinnovations/fantastic-front/view/successtexts'
import NodeLink from '@infosecinnovations/fantastic-front/view/scan/nodelink'
import Info from '@infosecinnovations/fantastic-front/view/scan/info'
import PlayButton from '@infosecinnovations/fantastic-front/view/scan/playbutton'
import Result from '@infosecinnovations/fantastic-front/view/scan/result'
import ProcessResults from '@infosecinnovations/fantastic-front/view/scan/processresults'

export default (state, send) => [
  h('h2.panel_title', 'Daily Quests'),
  h('div.scroll spaced', Object.entries(state.quests).filter(v => v[1].active).map(v => {
    const quest = v[0]
    const data = v[1]
    const result_date = state.quest_results.date[quest]
    const result_data = state.quest_results.data[quest]
    const result_approval = state.quest_results.approval[quest]
    const results = result_date > Date.now() - 1000 * 60 * 60 * 24 && result_data // TODO: maybe we want to be able to define a custom maximum result age
    const {pass, failed_nodes, status} = ProcessResults(state, data, results, result_approval)
    return h('div.scroll_item spaced', [
      ...Info(
        state, 
        send,
        data, 
        data.parameters || {},
        status
      ),
      ...(data.date_completed ? 'Mission accomplished!' : 
        PlayButton(
          state.quest_results.status[quest] === 'loading' ?
          'loading' :
          {on: {click: () => send({type: 'run_quest', quest})}}
        )
      ),
      ...(results ? 
        Result(
          state,
          send, 
          data,
          result_date,
          pass,
          data.parameters,
          failed_nodes, 
          {
            review_name: quest,
            event_type: 'quests',
            history_item: state.quest_results.history_items[quest],
            result_data: results,
            result_info: NodeLink(send, state.quest_results.nodes[quest], result_date, data.selection),
            success_prefix: result_date && `${SuccessTexts[Math.floor(SuccessTexts.length * new Alea(result_date)())]}!`,
            scan_id: state.quest_results.scan_ids[quest]
          })
      : [])
    ])
  }))
]