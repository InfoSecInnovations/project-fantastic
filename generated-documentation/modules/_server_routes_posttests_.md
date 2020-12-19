**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "server/routes/posttests"

# Module: "server/routes/posttests"

## Index

### Variables

* [Abort](_server_routes_posttests_.md#abort)
* [Auth](_server_routes_posttests_.md#auth)
* [End](_server_routes_posttests_.md#end)
* [GetHTTPData](_server_routes_posttests_.md#gethttpdata)
* [GetPackagedData](_server_routes_posttests_.md#getpackageddata)
* [HasRole](_server_routes_posttests_.md#hasrole)
* [ParseQuery](_server_routes_posttests_.md#parsequery)
* [RunTest](_server_routes_posttests_.md#runtest)
* [transaction](_server_routes_posttests_.md#transaction)

### Functions

* [postTests](_server_routes_posttests_.md#posttests)

## Variables

### Abort

• `Const` **Abort**: [abort](_server_routes_abort_.md#abort) = require('./abort')

*Defined in [server/routes/posttests.js:2](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/routes/posttests.js#L2)*

___

### Auth

• `Const` **Auth**: [auth](_server_routes_auth_index_.md#auth) = require('./auth')

*Defined in [server/routes/posttests.js:5](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/routes/posttests.js#L5)*

___

### End

• `Const` **End**: [end](_server_routes_end_.md#end) = require('./end')

*Defined in [server/routes/posttests.js:8](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/routes/posttests.js#L8)*

___

### GetHTTPData

• `Const` **GetHTTPData**: [getHttpData](_packages_fantastic_utils_gethttpdata_.md#gethttpdata) = require('fantastic-utils/gethttpdata')

*Defined in [server/routes/posttests.js:4](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/routes/posttests.js#L4)*

___

### GetPackagedData

• `Const` **GetPackagedData**: [getPackagedData](_server_util_getpackageddata_.md#getpackageddata) = require('../util/getpackageddata')

*Defined in [server/routes/posttests.js:6](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/routes/posttests.js#L6)*

___

### HasRole

• `Const` **HasRole**: [hasRole](_packages_fantastic_utils_hasrole_.md#hasrole) = require('fantastic-utils/hasrole')

*Defined in [server/routes/posttests.js:7](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/routes/posttests.js#L7)*

___

### ParseQuery

• `Const` **ParseQuery**: [parseQuery](_packages_fantastic_utils_parsequery_.md#parsequery) = require('fantastic-utils/parsequery')

*Defined in [server/routes/posttests.js:1](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/routes/posttests.js#L1)*

___

### RunTest

• `Const` **RunTest**: [runTest](_server_tests_runtest_.md#runtest) = require('../tests/runtest')

*Defined in [server/routes/posttests.js:3](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/routes/posttests.js#L3)*

___

### transaction

•  **transaction**: (mode: number) => Promise\<[Operations](_packages_fantastic_utils_db_types_d_.md#operations)>

*Defined in [server/routes/posttests.js:9](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/routes/posttests.js#L9)*

## Functions

### postTests

▸ `Const`**postTests**(`res`: any, `req`: any, `tests`: any): void

*Defined in [server/routes/posttests.js:11](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/routes/posttests.js#L11)*

#### Parameters:

Name | Type |
------ | ------ |
`res` | any |
`req` | any |
`tests` | any |

**Returns:** void
