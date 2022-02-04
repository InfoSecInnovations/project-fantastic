import {h} from 'snabbdom/h'
import WizardView from './wizardview'
import hosts from '../../common/hosts'

const localDescription = "This action can only be run on the machine hosting Fantastic."
const remoteDescription = "This action can only be run on a machine with PowerShell Remote access from the machine hosting Fantastic."
const bothDescription = "This action can be run on the machine hosting Fantastic and any machines with PowerShell Remote access from that machine."

export default (state, send) => WizardView(
  state, 
  send, 
  'Select Host Types', 
  "Select which types of host this action can be run on. Followup actions will be able to override this setting if necessary.",
  h('div.column', [
    ...hosts.map(host => h('span', [
      h('input', {
        attrs: {type: 'checkbox', id: `action-host-type-${host}`},
        props: {checked: state.action.json.hosts.includes(host)},
        on: {input: e => send({type: 'enable_action_host', enabled: e.target.checked, host})}
      }),
      h('label', {attrs: {for: `action-host-type-${host}`}}, host)
    ])),
    state.action.json.hosts.length ? h('div',
      state.action.json.hosts.includes('local') && state.action.json.hosts.includes('remote') ? bothDescription :
      state.action.json.hosts.includes('local') ? localDescription :
      remoteDescription
    ) : undefined
  ]),
  undefined,
  [state.action.json.hosts.length ? undefined : 'You must select at least one host type!']
)