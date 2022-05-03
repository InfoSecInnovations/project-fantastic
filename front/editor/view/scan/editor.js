import {h} from 'snabbdom/h'
import Info from '../common/info'
import Actions from './elements/actions'
import Parameters from './elements/parameters'
import Pass from './elements/pass'
import Quest from './elements/quest'

export default (state, send) => h('div#scan-editor.panel editor-scroll', [
  h('div.column', Info(state, send, 'scan')),
  h('div.column', [
    state.scan.json.actions && state.scan.json.actions.some(action => action.search && action.search.some(search => search.filter && !search.followup)) ? Parameters(state, send) : undefined,
    Actions(state, send),
    Pass(state, send),
    h('div.button', {
      on: {click: e => send({type: 'enabled_scan_quest', enabled: !state.scan.json.quest})}
    }, `${state.scan.json.quest ? 'Disable' : 'Enable'} this scan for daily quests`),
    state.scan.json.quest ? Quest(state, send) : undefined
  ])
])