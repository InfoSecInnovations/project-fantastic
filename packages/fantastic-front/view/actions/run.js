import {h} from 'snabbdom/h'
import FavoriteButton from '../favoritebutton'

export default (state, send, node, connection, action, title, id, loading) => {
  const action_data = state.actions[action]
  return h('div.item', [
    FavoriteButton(state, send, 'actions', action),
    h('label', {attrs: {for: id}}, h('div.item', [
      h('h3', title),
      h('div.button', 
        { 
          on: loading ? undefined : {
            click: e => {
              e.preventDefault()
              e.stopPropagation()
              send({
                type: action_data.inputs.run ? 'action_input' : 'perform_action',
                action_type: 'perform_action', 
                function: 'run',
                action, 
                node_id: node.node_id, 
                host: node.hostname, 
                connection: connection && connection.connection_id
              })
            }
          },
          class: {disabled: loading}
        }, 
        loading ? 'Running...' : 'Run'
      )
    ])),
  ])
} 