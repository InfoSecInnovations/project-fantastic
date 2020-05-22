# Data Sources

Data source scripts are used for gathering data about the network and storing it in the server's database.

**IMPORTANT: the format of these scripts is likely to change significantly in the near future!**

## Data source output

This should be output by a script placed in the `config/data_sources` directory.

    {
      hosts: ['local', 'remote'],
      result_type: 'ip_addresses' | 'mac_addresses' | 'hostname' | 'os | 'hosts' | 'connections',
      run: hostname => {}
    }

## hosts

### local

This script can run on the server

### remote

This script can run on a host with PowerShell remote access

## result_type

### ip_addresses

An array of IP Addresses in string format belonging to a single host

    ['127.0.0.1', '192.168.1.1', ...]

### mac_addresses

An array of MAC Addresses belonging to a single host.

Each entry contains the address and vendor in string format. If we know the actual name of the device we can use that in the vendor property.

    [
      {mac: '4C:CC:6A:61:D1:07', vendor: 'Realtek PCIe GBE Family Controller'},
      {mac: '62:45:B4:F1:DB:1C', vendor: 'Xbox Wireless Adapter for Windows'},
      ...
    ]

### hostname

The hostname of a host in string format

### os

The operating system of a host in string format

### hosts

An object containing information about the local host and an array of remote hosts.

    {
      local: {
        ips, // see ip_addresses
        macs, // see mac_addresses
        hostname,
        os
      },
      remote: [
        {
          // same format as local
        },
        ...
      ]
    }

### connections

An array of data about connections from a host.

Possible connection states are:
  - listen
  - syn_sent
  - syn_received
  - established
  - fin_wait_1
  - fin_wait_2
  - close_wait
  - closing
  - last_ack
  - time_wait
  - bound

</a>

    [
      {
        local_address, // local IP Address in string format
        local_port, // number
        remote_address, // remote IP Address in string format
        remote_port, // number
        process, // PID of process owning this connection in number format
        state // see possible states above
      },
      ...
    ]

## run

Async function or Promise which takes the hostname and returns the results for that machine. If no hostname is provided the data concerns the local host. You can use the functions provided by [fantastic-cli](fantastic-cli/index.md) to run PowerShell commands.