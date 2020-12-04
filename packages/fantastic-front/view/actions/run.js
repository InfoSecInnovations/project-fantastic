import {h} from 'snabbdom/h'

export default (send, node, connection, action, title, loading) => h('div.item', [
  h('h3', title),
  h('div.button', 
    { 
      on: loading ? undefined : {click: [send, {
        type: 'perform_action', 
        action, 
        node_id: node.node_id, 
        host: node.hostname, 
        connection: connection && connection.connection_id
      }]},
      class: {disabled: loading}
    }, 
    loading ? 'Running...' : 'Run')
])