**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "server/routes/getuserhistory"

# Module: "server/routes/getuserhistory"

## Index

### Variables

* [Abort](_server_routes_getuserhistory_.md#abort)
* [Auth](_server_routes_getuserhistory_.md#auth)
* [End](_server_routes_getuserhistory_.md#end)
* [GetUserHistory](_server_routes_getuserhistory_.md#getuserhistory)
* [ParseQuery](_server_routes_getuserhistory_.md#parsequery)

### Functions

* [getUserHistory](_server_routes_getuserhistory_.md#getuserhistory)

## Variables

### Abort

• `Const` **Abort**: [abort](_server_routes_abort_.md#abort) = require('./abort')

*Defined in [server/routes/getuserhistory.js:1](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/routes/getuserhistory.js#L1)*

___

### Auth

• `Const` **Auth**: [auth](_server_routes_auth_index_.md#auth) = require('./auth')

*Defined in [server/routes/getuserhistory.js:4](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/routes/getuserhistory.js#L4)*

___

### End

• `Const` **End**: [end](_server_routes_end_.md#end) = require('./end')

*Defined in [server/routes/getuserhistory.js:2](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/routes/getuserhistory.js#L2)*

___

### GetUserHistory

• `Const` **GetUserHistory**: [getUserHistory](_server_db_getuserhistory_index_.md#getuserhistory) = require('../db/getuserhistory')

*Defined in [server/routes/getuserhistory.js:5](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/routes/getuserhistory.js#L5)*

___

### ParseQuery

• `Const` **ParseQuery**: [parseQuery](_packages_fantastic_utils_parsequery_.md#parsequery) = require('fantastic-utils/parsequery')

*Defined in [server/routes/getuserhistory.js:3](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/routes/getuserhistory.js#L3)*

## Functions

### getUserHistory

▸ `Const`**getUserHistory**(`res`: any, `req`: any): Promise\<void>

*Defined in [server/routes/getuserhistory.js:7](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/routes/getuserhistory.js#L7)*

#### Parameters:

Name | Type |
------ | ------ |
`res` | any |
`req` | any |

**Returns:** Promise\<void>
