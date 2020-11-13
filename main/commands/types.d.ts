export type CommandType = 'hosts' | 'connections' | 'ip_addresses' | 'mac_addresses' | 'os' | 'hostname'
export type HostType = 'local' | 'remote' | 'none'
export type CommandMode = 'disabled' | 'enabled' | 'force'

export type Command = {
name: string
description?: string
hosts: HostType[]
result_type: CommandType
run: {
  command: string,
  method?: 'invoke' | 'cimsession'
  json?: boolean
  read_xml?: boolean
  result: string | {}
  }
}