import GenerateQuery from '../../common/effect/generatequery'

export default (send, node_parameters) => {
  send({type: 'loading', value: true})
  send({type: 'clear_selection'})
  fetch(`/nodes?${GenerateQuery(node_parameters)}`)
  .then(res => res.json())
  .then(res => send({type: 'nodes', nodes: res}))
}