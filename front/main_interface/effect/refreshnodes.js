import GenerateQuery from '@infosecinnovations/fantastic-front/effect/generatequery'

export default (state, send, node_parameters) => {
  send({type: 'loading', value: true})
  send({type: 'clear_selection'})
  send({type: 'select_story', story: null})
  fetch(`/nodes?${GenerateQuery(node_parameters)}`)
  .then(res => res.json())
  .then(res => {
    if (res.length > state.config.nodeCountWarning) send({type: 'node_warning', nodes: res})
    else send({type: 'nodes', nodes: res})
  })
}