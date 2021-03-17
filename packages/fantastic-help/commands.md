# Host Data Commands

Host Data Commands are the items that gather data from hosts on the network. The Get Hostname one is quite simple:

```
{
  "name": "Get Hostname",
  "description": "Simply executes hostname command on host",
  "hosts": ["local", "remote"],
  "result_type": "hostname",
  "run": {
    "command": "hostname",
    "method": "invoke"
  }
}
```
See also: 
- [Common Fields](common_fields.md)
- [PowerShell Commands](powershell_commands.md)

## result_type

Host Data Commands can gather the following data about a host:

- `hostname`
- `connections` - an array of connection objects with the following fields:
  - `local_address`
  - `local_port`
  - `remote_address`
  - `remote_port`
  - `process`
  - `state` : `"listen" | "syn_sent" | "syn_received" | "established" | "fin_wait_1" | "fin_wait_2" | "close_wait" | "closing" | "last_ack" | "time_wait" | "bound"`
- `ip_addresses` - an array of IP Adresses belonging to the host.
- `mac_addresses` - an array of Mac Addresses belonging to the host with the following fields:
    - `mac`
    - `vendor`
- `os` - the host's Operating System
- `hosts` - an array of data about hosts on the network with the following fields:
  - `local` - boolean, is this the machine running the server?  
  - `hostname`
  - `ips` - see `ip_addresses` above
  - `macs` - see `mac_addresses` above
  - `important` - boolean, is this machine on our network?