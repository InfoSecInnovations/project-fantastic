**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "server/commands/runcommands/findhosts"

# Module: "server/commands/runcommands/findhosts"

## Index

### Variables

* [DB](_server_commands_runcommands_findhosts_.md#db)
* [RunType](_server_commands_runcommands_findhosts_.md#runtype)

### Functions

* [findHosts](_server_commands_runcommands_findhosts_.md#findhosts)

## Variables

### DB

• `Const` **DB**: object = require('../../db')

*Defined in [server/commands/runcommands/findhosts.js:1](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/commands/runcommands/findhosts.js#L1)*

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

### RunType

• `Const` **RunType**: [runType](_server_commands_runcommands_runtype_.md#runtype) = require('./runtype')

*Defined in [server/commands/runcommands/findhosts.js:2](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/commands/runcommands/findhosts.js#L2)*

## Functions

### findHosts

▸ `Const`**findHosts**(`commands`: Object, `local`: number): Promise\<void>

*Defined in [server/commands/runcommands/findhosts.js:9](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/commands/runcommands/findhosts.js#L9)*

Run commands to find hosts on the network and add them to the database

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`commands` | Object |  |
`local` | number | database ID of host the server is running on  |

**Returns:** Promise\<void>
