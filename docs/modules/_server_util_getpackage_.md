**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "server/util/getpackage"

# Module: "server/util/getpackage"

## Index

### Variables

* [Decache](_server_util_getpackage_.md#decache)
* [GetConfigPath](_server_util_getpackage_.md#getconfigpath)
* [Path](_server_util_getpackage_.md#path)

### Functions

* [getPackage](_server_util_getpackage_.md#getpackage)

## Variables

### Decache

• `Const` **Decache**: "F:/project-fantastic/server/node_modules/decache/decache" = require('decache')

*Defined in [server/util/getpackage.js:3](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/util/getpackage.js#L3)*

___

### GetConfigPath

• `Const` **GetConfigPath**: [getConfigPath](_server_util_getconfigpath_.md#getconfigpath) = require('./getconfigpath')

*Defined in [server/util/getpackage.js:1](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/util/getpackage.js#L1)*

___

### Path

• `Const` **Path**: PlatformPath = require('path')

*Defined in [server/util/getpackage.js:2](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/util/getpackage.js#L2)*

## Functions

### getPackage

▸ `Const`**getPackage**(`name`: string): Promise\<any>

*Defined in [server/util/getpackage.js:9](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/util/getpackage.js#L9)*

get an npm module installed in the config directory by name

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`name` | string |   |

**Returns:** Promise\<any>
