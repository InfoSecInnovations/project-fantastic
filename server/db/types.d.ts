export type HostAccess = 'local' | 'remote' | 'none'

export type Node = {
  macs?: Array.<{mac: string, vendor: string}>,
  ips?: string[],
  hostname?: string,
  os?: string,
  important: boolean,
  access: HostAccess
}

export type NodeQuery = {
  date?: number,
  max_date?: number,
  access?: HostAccess[],
  nodes?: number[],
  connection_type?: 'different_ip' | 'different_host',
  connection_state?: string[],
  show_external?: boolean
}

export type Connection = {
  local_address: string,
  local_port: number,
  remote_address: string,
  remote_port: number,
  process: number,
  state: string
}