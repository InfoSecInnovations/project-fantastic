import {h} from 'snabbdom/h'

export default (state, send) => h('div.button', {
  on: {click: e => send({type: 'enable_scan_failure_followup', enabled: typeof state.scan.json.pass.failure != 'object'})}
}, `${typeof state.scan.json.pass.failure == 'object' ? 'Disable' : 'Enable'} failure followup action`)