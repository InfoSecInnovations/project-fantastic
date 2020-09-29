import {h} from 'snabbdom/h'
import IPAddress from '../../../common/util/ipaddress'

export default (connections, send) => h('div.scroll_container', 
  h('div.scroll', 
    connections.map(v => h('div.scroll_item button', {
      on: {click: [send, {type: 'connection', connection: v}]}
    }, [
      h('div.item', `Local address: ${IPAddress(v.local_address, v.local_port)}`),
      h('div.item', `Remote address: ${IPAddress(v.remote_address, v.remote_port)}`)
    ]))
  )
)