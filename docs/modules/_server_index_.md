**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "server/index"

# Module: "server/index"

## Index

### Variables

* [CreateRoutingServer](_server_index_.md#createroutingserver)
* [DB](_server_index_.md#db)
* [FS](_server_index_.md#fs)
* [GetActionData](_server_index_.md#getactiondata)
* [GetCommandData](_server_index_.md#getcommanddata)
* [GetConfig](_server_index_.md#getconfig)
* [GetPackage](_server_index_.md#getpackage)
* [GetTestData](_server_index_.md#gettestdata)
* [IsAdmin](_server_index_.md#isadmin)
* [Path](_server_index_.md#path)
* [Routes](_server_index_.md#routes)
* [RunCommands](_server_index_.md#runcommands)
* [UWS](_server_index_.md#uws)
* [WatchConfig](_server_index_.md#watchconfig)
* [fork](_server_index_.md#fork)

### Functions

* [main](_server_index_.md#main)

## Variables

### CreateRoutingServer

• `Const` **CreateRoutingServer**: [createRoutingServer](_server_createroutingserver_.md#createroutingserver) = require('./createroutingserver')

*Defined in [server/index.js:15](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/index.js#L15)*

___

### DB

• `Const` **DB**: object = require('./db')

*Defined in [server/index.js:2](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/index.js#L2)*

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

### FS

• `Const` **FS**: "fs" = require('fs')

*Defined in [server/index.js:11](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/index.js#L11)*

___

### GetActionData

• `Const` **GetActionData**: [getActionData](_server_actions_getactiondata_.md#getactiondata) = require('./actions/getactiondata')

*Defined in [server/index.js:6](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/index.js#L6)*

___

### GetCommandData

• `Const` **GetCommandData**: [getCommandData](_server_commands_getcommanddata_.md#getcommanddata) = require('./commands/getcommanddata')

*Defined in [server/index.js:4](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/index.js#L4)*

___

### GetConfig

• `Const` **GetConfig**: [getConfig](_server_util_getconfig_.md#getconfig) = require('./util/getconfig')

*Defined in [server/index.js:8](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/index.js#L8)*

___

### GetPackage

• `Const` **GetPackage**: [getPackage](_server_util_getpackage_.md#getpackage) = require('./util/getpackage')

*Defined in [server/index.js:10](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/index.js#L10)*

___

### GetTestData

• `Const` **GetTestData**: [getTestData](_server_tests_gettestdata_.md#gettestdata) = require('./tests/gettestdata')

*Defined in [server/index.js:7](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/index.js#L7)*

___

### IsAdmin

• `Const` **IsAdmin**: isAdmin = require('is-admin')

*Defined in [server/index.js:13](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/index.js#L13)*

___

### Path

• `Const` **Path**: PlatformPath = require('path')

*Defined in [server/index.js:12](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/index.js#L12)*

___

### Routes

• `Const` **Routes**: [routes](_server_routes_index_.md#routes) = require('./routes')

*Defined in [server/index.js:14](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/index.js#L14)*

___

### RunCommands

• `Const` **RunCommands**: [runCommands](_server_commands_runcommands_index_.md#runcommands) = require('./commands/runcommands')

*Defined in [server/index.js:5](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/index.js#L5)*

___

### UWS

• `Const` **UWS**: "F:/project-fantastic/server/node_modules/uWebSockets.js/index" = require('uWebSockets.js')

*Defined in [server/index.js:1](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/index.js#L1)*

___

### WatchConfig

• `Const` **WatchConfig**: [watchConfig](_server_watchconfig_.md#watchconfig) = require('./watchconfig')

*Defined in [server/index.js:9](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/index.js#L9)*

___

### fork

•  **fork**: fork

*Defined in [server/index.js:3](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/index.js#L3)*

## Functions

### main

▸ `Const`**main**(): Promise\<void>

*Defined in [server/index.js:20](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/index.js#L20)*

Start the server

**Returns:** Promise\<void>
