export default (state, send) => {
  fetch('/quest_history')
  .then(res => res.json())
  .then(res => res.forEach(v => {
    send({type: 'quest_results', quest: v.quest, date: v.date, results: JSON.parse(v.results), scan_id: v.scan_id, select: false})
    send({type: 'quest_nodes', quest: v.quest, nodes: JSON.parse(v.rows)})
    send({type: 'review_approval', data_key: v.quest, approved: v.approved, data_type: 'quests'})
  }))
  fetch('/scan_history')
  .then(res => res.json())
  .then(res => res.forEach(v => {
    send({type: 'scan_results', scan: v.scan, parameters: JSON.parse(v.parameters), date: v.date, scan_id: v.scan_id, results: JSON.parse(v.results), select: false})
    send({type: 'review_approval', data_key: v.scan, approved: v.approved})
  }))
  fetch('/story_history')
  .then(res => res.json())
  .then(res => {
    res.result_rows.forEach(v => {
      const story = state.stories[v.story]
      const story_node = story.nodeData[v.story_node_id]
      if (story_node.type == 'scans') {
        send({type: 'story_results', story: v.story, node: v.story_node_id, date: v.date, scan_id: v.scan_id, results: JSON.parse(v.results), select: false})
        send({type: 'story_nodes', story: v.story, node: v.story_node_id, nodes: JSON.parse(v.rows)})
        send({type: 'review_approval', data_key: v.story, story_node: v.story_node_id, approved: v.approved, data_type: 'stories'})
      }
    })
    res.completed_nodes.forEach(v => send({type: 'completed_story_node', story: v.story, node: v.story_node_id}))
  })
}