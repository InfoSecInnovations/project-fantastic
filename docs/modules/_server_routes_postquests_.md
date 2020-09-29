**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "server/routes/postquests"

# Module: "server/routes/postquests"

## Index

### Variables

* [Abort](_server_routes_postquests_.md#abort)
* [Auth](_server_routes_postquests_.md#auth)
* [End](_server_routes_postquests_.md#end)
* [GetPackagedData](_server_routes_postquests_.md#getpackageddata)
* [HasRole](_server_routes_postquests_.md#hasrole)
* [ParseQuery](_server_routes_postquests_.md#parsequery)
* [RunQuest](_server_routes_postquests_.md#runquest)
* [transaction](_server_routes_postquests_.md#transaction)

### Functions

* [postQuests](_server_routes_postquests_.md#postquests)

## Variables

### Abort

• `Const` **Abort**: [abort](_server_routes_abort_.md#abort) = require('./abort')

*Defined in [server/routes/postquests.js:2](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/routes/postquests.js#L2)*

___

### Auth

• `Const` **Auth**: [auth](_server_routes_auth_index_.md#auth) = require('./auth')

*Defined in [server/routes/postquests.js:4](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/routes/postquests.js#L4)*

___

### End

• `Const` **End**: [end](_server_routes_end_.md#end) = require('./end')

*Defined in [server/routes/postquests.js:7](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/routes/postquests.js#L7)*

___

### GetPackagedData

• `Const` **GetPackagedData**: [getPackagedData](_server_util_getpackageddata_.md#getpackageddata) = require('../util/getpackageddata')

*Defined in [server/routes/postquests.js:5](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/routes/postquests.js#L5)*

___

### HasRole

• `Const` **HasRole**: [hasRole](_packages_fantastic_utils_hasrole_.md#hasrole) = require('fantastic-utils/hasrole')

*Defined in [server/routes/postquests.js:6](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/routes/postquests.js#L6)*

___

### ParseQuery

• `Const` **ParseQuery**: [parseQuery](_packages_fantastic_utils_parsequery_.md#parsequery) = require('fantastic-utils/parsequery')

*Defined in [server/routes/postquests.js:1](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/routes/postquests.js#L1)*

___

### RunQuest

• `Const` **RunQuest**: [runQuest](_server_quests_runquest_.md#runquest) = require('../quests/runquest')

*Defined in [server/routes/postquests.js:3](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/routes/postquests.js#L3)*

___

### transaction

•  **transaction**: (mode: number) => Promise\<[Operations](_packages_fantastic_utils_db_types_d_.md#operations)>

*Defined in [server/routes/postquests.js:8](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/routes/postquests.js#L8)*

## Functions

### postQuests

▸ `Const`**postQuests**(`res`: any, `req`: any, `tests`: any): void

*Defined in [server/routes/postquests.js:10](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/routes/postquests.js#L10)*

#### Parameters:

Name | Type |
------ | ------ |
`res` | any |
`req` | any |
`tests` | any |

**Returns:** void
