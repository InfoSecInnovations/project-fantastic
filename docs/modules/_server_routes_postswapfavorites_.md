**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "server/routes/postswapfavorites"

# Module: "server/routes/postswapfavorites"

## Index

### Variables

* [Abort](_server_routes_postswapfavorites_.md#abort)
* [Auth](_server_routes_postswapfavorites_.md#auth)
* [End](_server_routes_postswapfavorites_.md#end)
* [GetUserHistory](_server_routes_postswapfavorites_.md#getuserhistory)
* [ParseQuery](_server_routes_postswapfavorites_.md#parsequery)
* [transaction](_server_routes_postswapfavorites_.md#transaction)

### Functions

* [postSwapFavorites](_server_routes_postswapfavorites_.md#postswapfavorites)

## Variables

### Abort

• `Const` **Abort**: [abort](_server_routes_abort_.md#abort) = require('./abort')

*Defined in [server/routes/postswapfavorites.js:2](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/routes/postswapfavorites.js#L2)*

___

### Auth

• `Const` **Auth**: [auth](_server_routes_auth_index_.md#auth) = require('./auth')

*Defined in [server/routes/postswapfavorites.js:3](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/routes/postswapfavorites.js#L3)*

___

### End

• `Const` **End**: [end](_server_routes_end_.md#end) = require('./end')

*Defined in [server/routes/postswapfavorites.js:4](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/routes/postswapfavorites.js#L4)*

___

### GetUserHistory

• `Const` **GetUserHistory**: [getUserHistory](_server_db_getuserhistory_index_.md#getuserhistory) = require('../db/getuserhistory')

*Defined in [server/routes/postswapfavorites.js:6](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/routes/postswapfavorites.js#L6)*

___

### ParseQuery

• `Const` **ParseQuery**: [parseQuery](_packages_fantastic_utils_parsequery_.md#parsequery) = require('fantastic-utils/parsequery')

*Defined in [server/routes/postswapfavorites.js:1](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/routes/postswapfavorites.js#L1)*

___

### transaction

•  **transaction**: (mode: number) => Promise\<[Operations](_packages_fantastic_utils_db_types_d_.md#operations)>

*Defined in [server/routes/postswapfavorites.js:5](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/routes/postswapfavorites.js#L5)*

## Functions

### postSwapFavorites

▸ `Const`**postSwapFavorites**(`res`: any, `req`: any): void

*Defined in [server/routes/postswapfavorites.js:8](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/routes/postswapfavorites.js#L8)*

#### Parameters:

Name | Type |
------ | ------ |
`res` | any |
`req` | any |

**Returns:** void
