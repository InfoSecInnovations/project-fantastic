**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "server/commands/runcommands/index"

# Module: "server/commands/runcommands/index"

## Index

### Variables

* [CreateCommands](_server_commands_runcommands_index_.md#createcommands)
* [DB](_server_commands_runcommands_index_.md#db)
* [FindHosts](_server_commands_runcommands_index_.md#findhosts)
* [GetNode](_server_commands_runcommands_index_.md#getnode)
* [GetRemoteHosts](_server_commands_runcommands_index_.md#getremotehosts)
* [RunType](_server_commands_runcommands_index_.md#runtype)

### Functions

* [runCommands](_server_commands_runcommands_index_.md#runcommands)

## Variables

### CreateCommands

• `Const` **CreateCommands**: [createCommands](_server_commands_runcommands_createcommands_.md#createcommands) = require('./createcommands')

*Defined in [server/commands/runcommands/index.js:3](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/commands/runcommands/index.js#L3)*

___

### DB

• `Const` **DB**: object = require('../../db')

*Defined in [server/commands/runcommands/index.js:5](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/commands/runcommands/index.js#L5)*

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

### FindHosts

• `Const` **FindHosts**: [findHosts](_server_commands_runcommands_findhosts_.md#findhosts) = require('./findhosts')

*Defined in [server/commands/runcommands/index.js:6](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/commands/runcommands/index.js#L6)*

___

### GetNode

• `Const` **GetNode**: [getNode](_server_commands_runcommands_getnode_.md#getnode) = require('./getnode')

*Defined in [server/commands/runcommands/index.js:1](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/commands/runcommands/index.js#L1)*

___

### GetRemoteHosts

• `Const` **GetRemoteHosts**: [getRemoteHosts](_server_commands_runcommands_getremotehosts_.md#getremotehosts) = require('./getremotehosts')

*Defined in [server/commands/runcommands/index.js:4](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/commands/runcommands/index.js#L4)*

___

### RunType

• `Const` **RunType**: [runType](_server_commands_runcommands_runtype_.md#runtype) = require('./runtype')

*Defined in [server/commands/runcommands/index.js:2](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/commands/runcommands/index.js#L2)*

## Functions

### runCommands

▸ `Const`**runCommands**(`get_commands`: () => Object): any

*Defined in [server/commands/runcommands/index.js:12](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/commands/runcommands/index.js#L12)*

continuously run commands to gather data about hosts

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`get_commands` | () => Object | function which returns the commands and their status  |

**Returns:** any
