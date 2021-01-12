import {h} from 'snabbdom/h'
import HostString from '@infosecinnovations/fantastic-front/util/hoststring'
const Alea = require('alea')
import Test from '@infosecinnovations/fantastic-front/view/test'
const ConvertTime = require('@infosecinnovations/fantastic-utils/converttime')
import SuccessTexts from '@infosecinnovations/fantastic-front/view/successtexts'
import MultiAction from '@infosecinnovations/fantastic-front/view/actions/multiaction'

export default (state, send) => {
  const storyData = state.stories && state.stories[state.story.selected]
  if (!storyData) return
  if (state.story.selected_node) {
    const selectedNode = storyData.nodeData[state.story.selected_node]
    if (selectedNode.type == 'tests') {
      const quest = selectedNode.key
      const data = state.tests[quest]
      // TODO: implement story_results
      const date = state.quest_results.date[quest]
      const parameters = data.parameters && {
        initial: data.parameters.reduce((result, p) => ({...result, [p.name]: p.default}), {}),
        get: () => ({...parameters.initial, ...selectedNode.parameters}),
        result: () => state.quest_results.nodes[quest] && h('div.link', {
          on: {click: e => {
            send({type: 'get_nodes', nodes: state.quest_results.nodes[quest], date: state.quest_results.date[quest] - ConvertTime(state.quests[quest].selection.age), max_date: state.quest_results.date[quest]})
          }}
        }, `${state.quest_results.nodes[quest].length} hosts scanned`)
      }
      return h('div.scroll', Test(
        state, 
        send, 
        quest, 
        data, 
        parameters,
        state.quest_results.data[quest],
        date,
        data.parameters,
        state.quest_results.approval[quest],
        state.quest_results.status[quest] === 'loading',
        {type: 'run_story_node', story: state.story.selected, node: state.story.selected_node},
        date && {success_prefix: `${SuccessTexts[Math.floor(SuccessTexts.length * new Alea(date)())]}!`, type: 'quests'}
      ))
    }
    return h('div.scroll', MultiAction(
      state, 
      selectedNode.key, 
      e => send({type: 'run_story_node', story: state.story.selected, node: state.story.selected_node})
    ))
  }
  return [
    h('h2', storyData.name),
    h('div.scroll', [
      h('div', storyData.description || ''),
      h('div.targets', [h('b', 'Valid targets:'), ` ${storyData.hosts.map(HostString).join(', ')}.`])
    ]) 
  ]
}