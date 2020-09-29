**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "server/commands/getcommanddata"

# Module: "server/commands/getcommanddata"

## Index

### Variables

* [GetPackage](_server_commands_getcommanddata_.md#getpackage)
* [get](_server_commands_getcommanddata_.md#get)

### Functions

* [getCommandData](_server_commands_getcommanddata_.md#getcommanddata)

## Variables

### GetPackage

• `Const` **GetPackage**: [getPackage](_server_util_getpackage_.md#getpackage) = require('../util/getpackage')

*Defined in [server/commands/getcommanddata.js:1](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/commands/getcommanddata.js#L1)*

___

### get

•  **get**: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<{} \| undefined>

*Defined in [server/commands/getcommanddata.js:2](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/commands/getcommanddata.js#L2)*

## Functions

### getCommandData

▸ `Const`**getCommandData**(`config`: {}): Object

*Defined in [server/commands/getcommanddata.js:9](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/commands/getcommanddata.js#L9)*

#### Parameters:

Name | Type |
------ | ------ |
`config` | {} |

**Returns:** Object

keys are command name, values are the command's status
