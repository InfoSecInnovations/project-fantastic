import {h} from 'snabbdom/h'
import Info from '../common/info'

export default (state, send) => h('div#action.content', {class: {hidden: state.mode != 'action'}}, [
  h('div#menu-bar.panel', [h('h2', 'Action Editor'), h('h2', state.action.json.name || state.action.filename)]),
  ...Info(
    state,
    send,
    'action',
    state.action.json.name,
    'set_action_name',
    state.action.json.description,
    'set_action_description',
    state.action.json.hosts,
    'enable_action_host',
    state.action.json.role,
    'set_action_role'
  )
])