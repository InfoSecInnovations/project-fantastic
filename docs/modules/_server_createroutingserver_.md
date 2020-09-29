**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "server/createroutingserver"

# Module: "server/createroutingserver"

## Index

### Variables

* [FS](_server_createroutingserver_.md#fs)
* [HTTPolyglot](_server_createroutingserver_.md#httpolyglot)
* [Path](_server_createroutingserver_.md#path)

### Functions

* [createRoutingServer](_server_createroutingserver_.md#createroutingserver)

## Variables

### FS

• `Const` **FS**: "fs" = require('fs')

*Defined in [server/createroutingserver.js:3](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/createroutingserver.js#L3)*

___

### HTTPolyglot

• `Const` **HTTPolyglot**: any = require('httpolyglot')

*Defined in [server/createroutingserver.js:1](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/createroutingserver.js#L1)*

___

### Path

• `Const` **Path**: PlatformPath = require('path')

*Defined in [server/createroutingserver.js:2](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/createroutingserver.js#L2)*

## Functions

### createRoutingServer

▸ `Const`**createRoutingServer**(`port`: number, `cert_directory`: string): any

*Defined in [server/createroutingserver.js:10](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/createroutingserver.js#L10)*

Create a server that redirects http and https traffic on a port to https on that port +1

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`port` | number |  |
`cert_directory` | string |   |

**Returns:** any
