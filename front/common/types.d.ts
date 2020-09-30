export type Connection = {
  connection_id: number,
  date: number,
  first_date: number,
  from_id: number,
  local_address: string,
  local_port: number,
  process: {
    id: number,
    name: string
  },
  process_id: number,
  remote_address: string,
  remote_port: number,
  state: string,
  to_id: number,
  to_node: number
}

export type Mac = {
  mac_id: number, 
  mac: string, 
  vendor: string
}

export type Node = {
  access: string,
  connections: Connection[],
  date: number,
  first_date: number,
  hostname: string,
  important: 0 | 1,
  ips: string[]
  macs: Mac[],
  node_id: number,
  os: string
}