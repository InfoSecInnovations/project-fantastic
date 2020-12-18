**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "server/routes/postreview"

# Module: "server/routes/postreview"

## Index

### Variables

* [Abort](_server_routes_postreview_.md#abort)
* [Auth](_server_routes_postreview_.md#auth)
* [End](_server_routes_postreview_.md#end)
* [ParseQuery](_server_routes_postreview_.md#parsequery)
* [transaction](_server_routes_postreview_.md#transaction)

### Functions

* [postReview](_server_routes_postreview_.md#postreview)

## Variables

### Abort

• `Const` **Abort**: [abort](_server_routes_abort_.md#abort) = require('./abort')

*Defined in [server/routes/postreview.js:2](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/routes/postreview.js#L2)*

___

### Auth

• `Const` **Auth**: [auth](_server_routes_auth_index_.md#auth) = require('./auth')

*Defined in [server/routes/postreview.js:4](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/routes/postreview.js#L4)*

___

### End

• `Const` **End**: [end](_server_routes_end_.md#end) = require('./end')

*Defined in [server/routes/postreview.js:5](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/routes/postreview.js#L5)*

___

### ParseQuery

• `Const` **ParseQuery**: [parseQuery](_packages_fantastic_utils_parsequery_.md#parsequery) = require('fantastic-utils/parsequery')

*Defined in [server/routes/postreview.js:1](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/routes/postreview.js#L1)*

___

### transaction

•  **transaction**: (mode: number) => Promise\<[Operations](_packages_fantastic_utils_db_types_d_.md#operations)>

*Defined in [server/routes/postreview.js:3](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/routes/postreview.js#L3)*

## Functions

### postReview

▸ `Const`**postReview**(`res`: any, `req`: any): void

*Defined in [server/routes/postreview.js:7](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/routes/postreview.js#L7)*

#### Parameters:

Name | Type |
------ | ------ |
`res` | any |
`req` | any |

**Returns:** void
