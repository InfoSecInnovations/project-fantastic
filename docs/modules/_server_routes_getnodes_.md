**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "server/routes/getnodes"

# Module: "server/routes/getnodes"

## Index

### Variables

* [Abort](_server_routes_getnodes_.md#abort)
* [DB](_server_routes_getnodes_.md#db)
* [ParseQuery](_server_routes_getnodes_.md#parsequery)
* [ValidateRole](_server_routes_getnodes_.md#validaterole)

### Functions

* [getNodes](_server_routes_getnodes_.md#getnodes)

## Variables

### Abort

• `Const` **Abort**: [abort](_server_routes_abort_.md#abort) = require('./abort')

*Defined in [server/routes/getnodes.js:3](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/routes/getnodes.js#L3)*

___

### DB

• `Const` **DB**: object = require('../db')

*Defined in [server/routes/getnodes.js:1](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/routes/getnodes.js#L1)*

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

### ParseQuery

• `Const` **ParseQuery**: [parseQuery](_packages_fantastic_utils_parsequery_.md#parsequery) = require('fantastic-utils/parsequery')

*Defined in [server/routes/getnodes.js:2](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/routes/getnodes.js#L2)*

___

### ValidateRole

• `Const` **ValidateRole**: [validateRole](_server_routes_auth_validaterole_.md#validaterole) = require('./auth/validaterole')

*Defined in [server/routes/getnodes.js:4](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/routes/getnodes.js#L4)*

## Functions

### getNodes

▸ `Const`**getNodes**(`res`: any, `req`: any): void

*Defined in [server/routes/getnodes.js:6](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/routes/getnodes.js#L6)*

#### Parameters:

Name | Type |
------ | ------ |
`res` | any |
`req` | any |

**Returns:** void
