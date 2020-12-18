**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "server/watchconfig"

# Module: "server/watchconfig"

## Index

### Variables

* [FS](_server_watchconfig_.md#fs)
* [GetCommandData](_server_watchconfig_.md#getcommanddata)
* [GetConfig](_server_watchconfig_.md#getconfig)
* [Path](_server_watchconfig_.md#path)

### Functions

* [update\_data](_server_watchconfig_.md#update_data)
* [watchConfig](_server_watchconfig_.md#watchconfig)

## Variables

### FS

• `Const` **FS**: "fs" = require('fs')

*Defined in [server/watchconfig.js:2](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/watchconfig.js#L2)*

___

### GetCommandData

• `Const` **GetCommandData**: [getCommandData](_server_commands_getcommanddata_.md#getcommanddata) = require('./commands/getcommanddata')

*Defined in [server/watchconfig.js:1](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/watchconfig.js#L1)*

___

### GetConfig

• `Const` **GetConfig**: [getConfig](_server_util_getconfig_.md#getconfig) = require('./util/getconfig')

*Defined in [server/watchconfig.js:4](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/watchconfig.js#L4)*

___

### Path

• `Const` **Path**: PlatformPath = require('path')

*Defined in [server/watchconfig.js:3](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/watchconfig.js#L3)*

## Functions

### update\_data

▸ `Const`**update_data**(`onchange`: any): Promise\<any>

*Defined in [server/watchconfig.js:6](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/watchconfig.js#L6)*

#### Parameters:

Name | Type |
------ | ------ |
`onchange` | any |

**Returns:** Promise\<any>

___

### watchConfig

▸ `Const`**watchConfig**(`onchange`: any): void

*Defined in [server/watchconfig.js:12](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/watchconfig.js#L12)*

#### Parameters:

Name | Type |
------ | ------ |
`onchange` | any |

**Returns:** void
