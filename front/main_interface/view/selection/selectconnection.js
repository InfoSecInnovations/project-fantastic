import {h} from 'snabbdom/h'
import IPAddress from '../../../common/util/ipaddress'

/**
 * 
 * @param {import('../../../common/types').Connection[]} connections
 * @param {(action: {}) => void} send
 */
export default (connections, send) => h('div.scroll_container', 
  h('div.scroll', 
    connections.map(v => h('div.scroll_item button', {
      on: {click: [send, {type: 'connection', connection: {...v, single: connections.length === 1}}]}
    }, `${v.process.name} ${IPAddress(v.local_address, v.local_port)} - ${IPAddress(v.remote_address, v.remote_port)}`))
  )
)