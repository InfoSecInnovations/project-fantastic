import {h} from 'snabbdom/h'
import Info from '../common/info'
import Actions from './elements/actions'
import Parameters from './elements/parameters'
import Pass from './elements/pass'
import quest from './elements/quest'

export default (state, send) => h('div#scan-editor.panel editor-scroll', [
  h('div.column', Info(state, send, 'scan')),
  h('div.column', [
    Parameters(state, send),
    Actions(state, send),
    Pass(state, send),
    h('div.button', {
      on: {click: e => send({type: 'scan_quest_enabled', enabled: !state.scan.json.quest})}
    }, `${state.scan.json.quest ? 'Disable' : 'Enable'} this scan for daily quests`),
    state.scan.json.quest ? quest(state, send) : undefined
  ])
])