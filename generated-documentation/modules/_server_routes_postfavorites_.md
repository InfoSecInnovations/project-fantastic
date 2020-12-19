**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "server/routes/postfavorites"

# Module: "server/routes/postfavorites"

## Index

### Variables

* [Abort](_server_routes_postfavorites_.md#abort)
* [Auth](_server_routes_postfavorites_.md#auth)
* [CompareEvent](_server_routes_postfavorites_.md#compareevent)
* [End](_server_routes_postfavorites_.md#end)
* [GetData](_server_routes_postfavorites_.md#getdata)
* [GetUserFavorites](_server_routes_postfavorites_.md#getuserfavorites)
* [GetUserHistory](_server_routes_postfavorites_.md#getuserhistory)
* [ParseQuery](_server_routes_postfavorites_.md#parsequery)
* [transaction](_server_routes_postfavorites_.md#transaction)

### Functions

* [postFavorites](_server_routes_postfavorites_.md#postfavorites)

## Variables

### Abort

• `Const` **Abort**: [abort](_server_routes_abort_.md#abort) = require('./abort')

*Defined in [server/routes/postfavorites.js:2](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/routes/postfavorites.js#L2)*

___

### Auth

• `Const` **Auth**: [auth](_server_routes_auth_index_.md#auth) = require('./auth')

*Defined in [server/routes/postfavorites.js:3](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/routes/postfavorites.js#L3)*

___

### CompareEvent

• `Const` **CompareEvent**: [compareEvent](_packages_fantastic_utils_compareevent_.md#compareevent) = require('fantastic-utils/compareevent')

*Defined in [server/routes/postfavorites.js:8](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/routes/postfavorites.js#L8)*

___

### End

• `Const` **End**: [end](_server_routes_end_.md#end) = require('./end')

*Defined in [server/routes/postfavorites.js:4](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/routes/postfavorites.js#L4)*

___

### GetData

• `Const` **GetData**: [getData](_server_db_getuserhistory_getdata_.md#getdata) = require('../db/getuserhistory/getdata')

*Defined in [server/routes/postfavorites.js:9](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/routes/postfavorites.js#L9)*

___

### GetUserFavorites

• `Const` **GetUserFavorites**: [getFavorites](_server_db_getuserhistory_getuserfavorites_.md#getfavorites) = require('../db/getuserhistory/getuserfavorites')

*Defined in [server/routes/postfavorites.js:7](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/routes/postfavorites.js#L7)*

___

### GetUserHistory

• `Const` **GetUserHistory**: [getUserHistory](_server_db_getuserhistory_index_.md#getuserhistory) = require('../db/getuserhistory')

*Defined in [server/routes/postfavorites.js:6](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/routes/postfavorites.js#L6)*

___

### ParseQuery

• `Const` **ParseQuery**: [parseQuery](_packages_fantastic_utils_parsequery_.md#parsequery) = require('fantastic-utils/parsequery')

*Defined in [server/routes/postfavorites.js:1](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/routes/postfavorites.js#L1)*

___

### transaction

•  **transaction**: (mode: number) => Promise\<[Operations](_packages_fantastic_utils_db_types_d_.md#operations)>

*Defined in [server/routes/postfavorites.js:5](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/routes/postfavorites.js#L5)*

## Functions

### postFavorites

▸ `Const`**postFavorites**(`res`: any, `req`: any): void

*Defined in [server/routes/postfavorites.js:11](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/routes/postfavorites.js#L11)*

#### Parameters:

Name | Type |
------ | ------ |
`res` | any |
`req` | any |

**Returns:** void
