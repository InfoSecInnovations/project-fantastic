export default (state, data, results, result_approval) => {
  const pass = results && (data.pass === 'review' ? result_approval : results.every(r => r.result == data.pass.condition))
  const failed_results = results && data.pass !== 'review' ? results.filter(r => r.result != data.pass.condition) : []
  const failed_nodes = failed_results.map(v => state.nodes.findIndex(n => n.node_id === v.node_id))
  const status = results && pass ? 'success' : results && !pass ? 'failure' : 'pending'
  return {
    pass,
    failed_nodes,
    status
  }
}