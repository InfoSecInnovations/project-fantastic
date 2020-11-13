import {h} from 'snabbdom/h'
const FormatString = require('@infosecinnovations/fantastic-utils/formatstring')

export default (connection, command) => h('pre', connection ? FormatString(command, {
  process: connection.process.id, 
  local_ip: connection.local_address, 
  local_port: connection.local_port, 
  remote_ip: connection.remote_address, 
  remote_port: connection.remote_port
}) : command)