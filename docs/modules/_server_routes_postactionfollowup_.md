**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "server/routes/postactionfollowup"

# Module: "server/routes/postactionfollowup"

## Index

### Variables

* [Abort](_server_routes_postactionfollowup_.md#abort)
* [Auth](_server_routes_postactionfollowup_.md#auth)
* [End](_server_routes_postactionfollowup_.md#end)
* [GetPackagedData](_server_routes_postactionfollowup_.md#getpackageddata)
* [HasRole](_server_routes_postactionfollowup_.md#hasrole)
* [ParseQuery](_server_routes_postactionfollowup_.md#parsequery)
* [RunAction](_server_routes_postactionfollowup_.md#runaction)
* [transaction](_server_routes_postactionfollowup_.md#transaction)

### Functions

* [postActionFollowup](_server_routes_postactionfollowup_.md#postactionfollowup)

## Variables

### Abort

• `Const` **Abort**: [abort](_server_routes_abort_.md#abort) = require('./abort')

*Defined in [server/routes/postactionfollowup.js:2](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/routes/postactionfollowup.js#L2)*

___

### Auth

• `Const` **Auth**: [auth](_server_routes_auth_index_.md#auth) = require('./auth')

*Defined in [server/routes/postactionfollowup.js:5](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/routes/postactionfollowup.js#L5)*

___

### End

• `Const` **End**: [end](_server_routes_end_.md#end) = require('./end')

*Defined in [server/routes/postactionfollowup.js:7](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/routes/postactionfollowup.js#L7)*

___

### GetPackagedData

• `Const` **GetPackagedData**: [getPackagedData](_server_util_getpackageddata_.md#getpackageddata) = require('../util/getpackageddata')

*Defined in [server/routes/postactionfollowup.js:6](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/routes/postactionfollowup.js#L6)*

___

### HasRole

• `Const` **HasRole**: [hasRole](_packages_fantastic_utils_hasrole_.md#hasrole) = require('fantastic-utils/hasrole')

*Defined in [server/routes/postactionfollowup.js:4](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/routes/postactionfollowup.js#L4)*

___

### ParseQuery

• `Const` **ParseQuery**: [parseQuery](_packages_fantastic_utils_parsequery_.md#parsequery) = require('fantastic-utils/parsequery')

*Defined in [server/routes/postactionfollowup.js:1](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/routes/postactionfollowup.js#L1)*

___

### RunAction

• `Const` **RunAction**: [runAction](_server_actions_runaction_index_.md#runaction) = require('../actions/runaction')

*Defined in [server/routes/postactionfollowup.js:3](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/routes/postactionfollowup.js#L3)*

___

### transaction

•  **transaction**: (mode: number) => Promise\<[Operations](_packages_fantastic_utils_db_types_d_.md#operations)>

*Defined in [server/routes/postactionfollowup.js:8](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/routes/postactionfollowup.js#L8)*

## Functions

### postActionFollowup

▸ `Const`**postActionFollowup**(`res`: any, `req`: any, `actions`: any): void

*Defined in [server/routes/postactionfollowup.js:10](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/routes/postactionfollowup.js#L10)*

#### Parameters:

Name | Type |
------ | ------ |
`res` | any |
`req` | any |
`actions` | any |

**Returns:** void
