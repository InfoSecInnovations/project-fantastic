**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "server/routes/getlogs"

# Module: "server/routes/getlogs"

## Index

### Variables

* [Abort](_server_routes_getlogs_.md#abort)
* [End](_server_routes_getlogs_.md#end)
* [GetByID](_server_routes_getlogs_.md#getbyid)
* [GetByUsername](_server_routes_getlogs_.md#getbyusername)
* [GetData](_server_routes_getlogs_.md#getdata)
* [OPEN\_READONLY](_server_routes_getlogs_.md#open_readonly)
* [ParseQuery](_server_routes_getlogs_.md#parsequery)
* [ValidateRole](_server_routes_getlogs_.md#validaterole)
* [transaction](_server_routes_getlogs_.md#transaction)

### Functions

* [getLogs](_server_routes_getlogs_.md#getlogs)

## Variables

### Abort

• `Const` **Abort**: [abort](_server_routes_abort_.md#abort) = require('./abort')

*Defined in [server/routes/getlogs.js:2](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/routes/getlogs.js#L2)*

___

### End

• `Const` **End**: [end](_server_routes_end_.md#end) = require('./end')

*Defined in [server/routes/getlogs.js:3](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/routes/getlogs.js#L3)*

___

### GetByID

• `Const` **GetByID**: [getById](_server_routes_auth_getbyid_.md#getbyid) = require('./auth/getbyid')

*Defined in [server/routes/getlogs.js:6](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/routes/getlogs.js#L6)*

___

### GetByUsername

• `Const` **GetByUsername**: [getByUsername](_server_routes_auth_getbyusername_.md#getbyusername) = require('./auth/getbyusername')

*Defined in [server/routes/getlogs.js:7](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/routes/getlogs.js#L7)*

___

### GetData

• `Const` **GetData**: [getData](_server_db_getuserhistory_getdata_.md#getdata) = require('../db/getuserhistory/getdata')

*Defined in [server/routes/getlogs.js:8](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/routes/getlogs.js#L8)*

___

### OPEN\_READONLY

•  **OPEN\_READONLY**: any

*Defined in [server/routes/getlogs.js:5](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/routes/getlogs.js#L5)*

___

### ParseQuery

• `Const` **ParseQuery**: [parseQuery](_packages_fantastic_utils_parsequery_.md#parsequery) = require('fantastic-utils/parsequery')

*Defined in [server/routes/getlogs.js:4](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/routes/getlogs.js#L4)*

___

### ValidateRole

• `Const` **ValidateRole**: [validateRole](_server_routes_auth_validaterole_.md#validaterole) = require('./auth/validaterole')

*Defined in [server/routes/getlogs.js:1](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/routes/getlogs.js#L1)*

___

### transaction

•  **transaction**: (mode: number) => Promise\<[Operations](_packages_fantastic_utils_db_types_d_.md#operations)>

*Defined in [server/routes/getlogs.js:5](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/routes/getlogs.js#L5)*

## Functions

### getLogs

▸ `Const`**getLogs**(`res`: any, `req`: any): void

*Defined in [server/routes/getlogs.js:10](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/routes/getlogs.js#L10)*

#### Parameters:

Name | Type |
------ | ------ |
`res` | any |
`req` | any |

**Returns:** void
