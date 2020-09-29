**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "server/commands/runcommands/getremotehosts"

# Module: "server/commands/runcommands/getremotehosts"

## Index

### Variables

* [DB](_server_commands_runcommands_getremotehosts_.md#db)
* [RunPowerShell](_server_commands_runcommands_getremotehosts_.md#runpowershell)

### Functions

* [getRemoteHosts](_server_commands_runcommands_getremotehosts_.md#getremotehosts)

## Variables

### DB

• `Const` **DB**: object = require('../../db')

*Defined in [server/commands/runcommands/getremotehosts.js:1](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/commands/runcommands/getremotehosts.js#L1)*

#### Type declaration:

Name | Type |
------ | ------ |
`addConnections` | [addConnections](_server_db_addconnections_index_.md#addconnections) |
`addMacs` | [addMacs](_server_db_addmacs_.md#addmacs) |
`addNodes` | [addNodes](_server_db_addnodes_index_.md#addnodes) |
`getNodes` | [getNodes](_server_db_getnodes_index_.md#getnodes) |
`init` | [init](_server_db_index_.md#init) |
`updateNode` | [updateNode](_server_db_updatenode_.md#updatenode) |

___

### RunPowerShell

• `Const` **RunPowerShell**: [child](_packages_fantastic_cli_runpowershell_.md#child) = require('fantastic-cli/runpowershell')

*Defined in [server/commands/runcommands/getremotehosts.js:2](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/commands/runcommands/getremotehosts.js#L2)*

## Functions

### getRemoteHosts

▸ `Const`**getRemoteHosts**(`local`: number): Promise\<{ hostname: any ; id: any = node.node\_id }[]>

*Defined in [server/commands/runcommands/getremotehosts.js:8](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/commands/runcommands/getremotehosts.js#L8)*

Find hosts on our network we can remotely access using PowerShell

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`local` | number | database ID of the host the server is running on  |

**Returns:** Promise\<{ hostname: any ; id: any = node.node\_id }[]>
