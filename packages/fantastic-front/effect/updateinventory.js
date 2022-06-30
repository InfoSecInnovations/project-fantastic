import GenerateQuery from './generatequery'

export default (nodes, send) => {
  if (!nodes || !nodes.length) return
  fetch(`/inventory_data?${GenerateQuery({nodes: nodes.map(v => v.node_id), date: !state.search || !state.search.date ? 0 : Date.now() - state.search.date * 1000 * 60 })}`)
  .then(res => res.json())
  .then(res => {
    Object.entries(res).forEach(([k, v]) => {
      const node = nodes.find(n => n.node_id === parseInt(k))
      send({type: 'inventory_data', data: v, host: node.hostname})
    })
  })
}