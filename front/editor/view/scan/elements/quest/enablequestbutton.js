import {h} from 'snabbdom/h'

export default (state, send) => h('div.button', {
  on: {click: e => send({type: 'enabled_scan_quest', enabled: !state.scan.json.quest})}
}, `${state.scan.json.quest ? 'Disable' : 'Enable'} this scan for daily quests`)