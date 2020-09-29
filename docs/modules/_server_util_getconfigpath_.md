**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "server/util/getconfigpath"

# Module: "server/util/getconfigpath"

## Index

### Variables

* [FS](_server_util_getconfigpath_.md#fs)
* [Path](_server_util_getconfigpath_.md#path)
* [custom\_path](_server_util_getconfigpath_.md#custom_path)
* [default\_path](_server_util_getconfigpath_.md#default_path)

### Functions

* [getConfigPath](_server_util_getconfigpath_.md#getconfigpath)

## Variables

### FS

• `Const` **FS**: "fs/promises" = require('fs').promises

*Defined in [server/util/getconfigpath.js:1](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/util/getconfigpath.js#L1)*

___

### Path

• `Const` **Path**: PlatformPath = require('path')

*Defined in [server/util/getconfigpath.js:2](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/util/getconfigpath.js#L2)*

___

### custom\_path

• `Const` **custom\_path**: string = Path.join(\_\_dirname, '../config')

*Defined in [server/util/getconfigpath.js:4](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/util/getconfigpath.js#L4)*

___

### default\_path

• `Const` **default\_path**: string = Path.join(\_\_dirname, '../default\_config')

*Defined in [server/util/getconfigpath.js:5](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/util/getconfigpath.js#L5)*

## Functions

### getConfigPath

▸ `Const`**getConfigPath**(): Promise\<string>

*Defined in [server/util/getconfigpath.js:10](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/util/getconfigpath.js#L10)*

Get the directory of the config package

**Returns:** Promise\<string>
