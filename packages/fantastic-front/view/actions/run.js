import {h} from 'snabbdom/h'
import FavoriteButton from '../favoritebutton'

export default (state, send, node, connection, action, title, loading) => h('div.item', [
  FavoriteButton(state, send, 'actions', action),
  h('label', {attrs: {for: action}}, h('h3', title)),
  h('div.button', 
    { 
      on: loading ? undefined : {click: e => send({
        type: 'perform_action', 
        action, 
        node_id: node.node_id, 
        host: node.hostname, 
        connection: connection && connection.connection_id
      })},
      class: {disabled: loading}
    }, 
    loading ? 'Running...' : 'Run')
])