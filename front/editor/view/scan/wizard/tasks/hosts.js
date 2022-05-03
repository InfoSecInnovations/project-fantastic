import {h} from 'snabbdom/h'
import hosts from '../../../common/hosts'

const localDescription = "This scan can only be run on the machine hosting Fantastic."
const remoteDescription = "This scan can only be run on a machine with PowerShell Remote access from the machine hosting Fantastic."
const bothDescription = "This scan can be run on the machine hosting Fantastic and any machines with PowerShell Remote access from that machine."

export default {
  title: 'Select Host Types',
  description: "Select which types of host this scan can be run on. Followup scans will be able to override this setting if necessary.",
  view: (state, send) => h('div.column', [
    ...hosts.map(host => h('span', [
      h('input', {
        attrs: {type: 'checkbox', id: `scan-host-type-${host}`},
        props: {checked: state.scan.json.hosts.includes(host)},
        on: {input: e => send({type: 'enable_host', itemType: 'scan', enabled: e.target.checked, host})}
      }),
      h('label', {attrs: {for: `scan-host-type-${host}`}}, host)
    ])),
    state.scan.json.hosts.length ? h('div',
      state.scan.json.hosts.includes('local') && state.scan.json.hosts.includes('remote') ? bothDescription :
      state.scan.json.hosts.includes('local') ? localDescription :
      remoteDescription
    ) : undefined
  ]),
  errors: state => [state.scan.json.hosts.length ? undefined : 'You must select at least one host type!']
}