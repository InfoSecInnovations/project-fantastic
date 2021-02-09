import {h} from 'snabbdom/h'
import HostString from '@infosecinnovations/fantastic-front/util/hoststring'
import MultiAction from '@infosecinnovations/fantastic-front/view/actions/multiaction'
import StatusIcon from '@infosecinnovations/fantastic-front/view/statusicon'
import Info from '@infosecinnovations/fantastic-front/view/test/info'
import PlayButton from '@infosecinnovations/fantastic-front/view/test/playbutton'
import Result from '@infosecinnovations/fantastic-front/view/test/result'
import NodeLink from '@infosecinnovations/fantastic-front/view/test/nodelink'
const DefaultParameters = require('@infosecinnovations/fantastic-utils/defaultparameters')

const successText = () => h('div.item success', 'Mission accomplished!')

export default (state, send) => {
  const storyData = state.stories && state.stories[state.story.selected]
  if (!storyData) return
  if (state.story.selected_node) {
    const completed = state.story.completed[state.story.selected] && state.story.completed[state.story.selected][state.story.selected_node]
    const selectedNode = storyData.nodeData[state.story.selected_node]
    const loading = state.story_results.status[state.story.selected] && state.story_results.status[state.story.selected][state.story.selected_node] == 'loading'
    if (selectedNode.type == 'scans') {
      const scan = selectedNode.key
      const data = state.scans[scan]
      const results = state.story_results.data[state.story.selected] && state.story_results.data[state.story.selected][state.story.selected_node]
      const result_nodes = state.story_results.nodes[state.story.selected] && state.story_results.nodes[state.story.selected][state.story.selected_node]
      const result_date = state.story_results.date[state.story.selected] && state.story_results.date[state.story.selected][state.story.selected_node]
      const failed_results = results && data.pass !== 'review' ? results.filter(r => r.result != data.pass.condition) : []
      const failed_nodes = failed_results.map(v => state.nodes.findIndex(n => n.node_id === v.node_id))
      const status = completed ? 'success' : results && !completed ? 'failure' : 'pending'
      const result_parameters = data.parameters && {...DefaultParameters(data), ...selectedNode.parameters}
      return h('div.scroll', h('div.scroll_item spaced', [
        ...Info(
          state, 
          data, 
          result_parameters,
          status
        ),
        ...(completed ? [successText()] : PlayButton(
          loading ? 'loading' :
          {on: {click: () => send({type: 'run_story_node', story: state.story.selected, node: state.story.selected_node})}}
        )),
        ...(results ? Result(
          send,
          data,
          result_date,
          completed,
          result_parameters,
          failed_nodes,
          {
            review_type: 'stories',
            review_name: state.story.selected,
            review_node: state.story.selected_node,
            review_results: results,
            result_info: NodeLink(send, result_nodes, result_date, storyData.selection),
            success_prefix: 'Mission accomplished!',
            scan_id: state.story_results.scan_ids[state.story.selected] && state.story_results.scan_ids[state.story.selected][state.story.selected_node]
          }
        ) : [])

      ]))
    }
    if (completed) return h('div.scroll', [
      h('div.item', [
        h('h3', state.actions[selectedNode.key].name),
        StatusIcon('success'),
      ]),
      successText()
    ])
    return h('div.scroll', MultiAction(
      state, 
      selectedNode.key,
      loading ? 'loading' :
      { on: {click: () => send({type: 'run_story_node', story: state.story.selected, node: state.story.selected_node})}}   
    ))
  }
  return [
    h('h2', storyData.name),
    h('div.scroll', [
      h('div.progress', `${Object.keys(storyData.nodeData).filter(key => state.story.completed[state.story.selected] && state.story.completed[state.story.selected][key]).length}/${Object.keys(storyData.nodeData).length}`),
      h('div', storyData.description || ''),
      h('div.targets', [h('b', 'Valid targets:'), ` ${storyData.hosts.map(HostString).join(', ')}.`])
    ]) 
  ]
}