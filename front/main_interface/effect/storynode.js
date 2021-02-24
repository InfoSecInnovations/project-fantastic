import UserHistory from './userhistory'

export default (state, send, story, node, data) => {
  const story_node = state.stories[story].nodeData[node]
  if (story_node.type == 'scans') {
    const scan = state.scans[story_node.key]
    send({
      type: 'story_results', 
      scan_id: data.scan_id,
      story,
      node,
      nodes: data.rows,
      results: data.result, 
      date: data.date, 
      select: true
    })
    send({
      type: 'scan_results', 
      scan_id: data.scan_id,
      results: data.result, 
      date: data.date, 
      parameters: data.parameters, 
      scan: story_node.key})
    if (scan.pass == 'review') send({type: 'review', results: data.result, data_key: story, data_type: 'stories', story_node: node})
  }
  UserHistory(send)
  if (data.success) send({type: 'completed_story_node', story, node})
}