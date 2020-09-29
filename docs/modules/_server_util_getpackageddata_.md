**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "server/util/getpackageddata"

# Module: "server/util/getpackageddata"

## Index

### Variables

* [FS](_server_util_getpackageddata_.md#fs)
* [GetConfigPath](_server_util_getpackageddata_.md#getconfigpath)
* [GetPackage](_server_util_getpackageddata_.md#getpackage)
* [Path](_server_util_getpackageddata_.md#path)

### Functions

* [getPackagedData](_server_util_getpackageddata_.md#getpackageddata)

## Variables

### FS

• `Const` **FS**: "fs/promises" = require('fs').promises

*Defined in [server/util/getpackageddata.js:2](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/util/getpackageddata.js#L2)*

___

### GetConfigPath

• `Const` **GetConfigPath**: [getConfigPath](_server_util_getconfigpath_.md#getconfigpath) = require('./getconfigpath')

*Defined in [server/util/getpackageddata.js:4](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/util/getpackageddata.js#L4)*

___

### GetPackage

• `Const` **GetPackage**: [getPackage](_server_util_getpackage_.md#getpackage) = require('./getpackage')

*Defined in [server/util/getpackageddata.js:1](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/util/getpackageddata.js#L1)*

___

### Path

• `Const` **Path**: PlatformPath = require('path')

*Defined in [server/util/getpackageddata.js:3](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/util/getpackageddata.js#L3)*

## Functions

### getPackagedData

▸ `Const`**getPackagedData**(`path`: string, `data_type`: \"actions\" \| \"commands\" \| \"tests\"): undefined \| {}

*Defined in [server/util/getpackageddata.js:12](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/util/getpackageddata.js#L12)*

Load a data object from a package installed in the config directory

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`path` | string | package_name/object_name |
`data_type` | \"actions\" \| \"commands\" \| \"tests\" |  |

**Returns:** undefined \| {}

| undefined}
