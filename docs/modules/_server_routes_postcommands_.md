**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "server/routes/postcommands"

# Module: "server/routes/postcommands"

## Index

### Variables

* [Abort](_server_routes_postcommands_.md#abort)
* [Auth](_server_routes_postcommands_.md#auth)
* [GetPackagedData](_server_routes_postcommands_.md#getpackageddata)
* [HasRole](_server_routes_postcommands_.md#hasrole)
* [ParseQuery](_server_routes_postcommands_.md#parsequery)
* [transaction](_server_routes_postcommands_.md#transaction)

### Functions

* [postCommands](_server_routes_postcommands_.md#postcommands)

## Variables

### Abort

• `Const` **Abort**: [abort](_server_routes_abort_.md#abort) = require('./abort')

*Defined in [server/routes/postcommands.js:2](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/routes/postcommands.js#L2)*

___

### Auth

• `Const` **Auth**: [auth](_server_routes_auth_index_.md#auth) = require('./auth')

*Defined in [server/routes/postcommands.js:3](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/routes/postcommands.js#L3)*

___

### GetPackagedData

• `Const` **GetPackagedData**: [getPackagedData](_server_util_getpackageddata_.md#getpackageddata) = require('../util/getpackageddata')

*Defined in [server/routes/postcommands.js:4](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/routes/postcommands.js#L4)*

___

### HasRole

• `Const` **HasRole**: [hasRole](_packages_fantastic_utils_hasrole_.md#hasrole) = require('fantastic-utils/hasrole')

*Defined in [server/routes/postcommands.js:5](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/routes/postcommands.js#L5)*

___

### ParseQuery

• `Const` **ParseQuery**: [parseQuery](_packages_fantastic_utils_parsequery_.md#parsequery) = require('fantastic-utils/parsequery')

*Defined in [server/routes/postcommands.js:1](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/routes/postcommands.js#L1)*

___

### transaction

•  **transaction**: (mode: number) => Promise\<[Operations](_packages_fantastic_utils_db_types_d_.md#operations)>

*Defined in [server/routes/postcommands.js:6](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/routes/postcommands.js#L6)*

## Functions

### postCommands

▸ `Const`**postCommands**(`res`: any, `req`: any, `commands`: any): Promise\<any>

*Defined in [server/routes/postcommands.js:8](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/routes/postcommands.js#L8)*

#### Parameters:

Name | Type |
------ | ------ |
`res` | any |
`req` | any |
`commands` | any |

**Returns:** Promise\<any>
