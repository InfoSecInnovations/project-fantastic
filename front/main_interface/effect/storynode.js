import UserHistory from './userhistory'
const DefaultParameters = require('@infosecinnovations/fantastic-utils/defaultparameters')

export default (state, send, story, node, data) => {
  const story_node = state.stories[story].nodeData[node]
  if (story_node.type == 'tests') {
    const test = state.tests[story_node.key]
    send({
      type: 'story_results', 
      test_id: data.test_id,
      story,
      node,
      nodes: data.rows,
      results: data.result, 
      date: data.date, 
      select: true
    })
    send({
      type: 'test_results', 
      test_id: data.test_id,
      results: data.result, 
      date: data.date, 
      parameters: {...DefaultParameters(test), ...story_node.parameters}, 
      test: story_node.key}) // quest results are the same as the test run by the quest
    if (test.pass == 'review') send({type: 'review', results: data.result, data_key: story, data_type: 'stories', story_node: node})
  }
  UserHistory(send)
  if (data.success) send({type: 'completed_story_node', story, node})
}