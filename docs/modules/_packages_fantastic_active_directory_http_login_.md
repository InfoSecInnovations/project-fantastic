**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "packages/fantastic-active_directory/http/login"

# Module: "packages/fantastic-active_directory/http/login"

## Index

### Variables

* [ActiveDirectory](_packages_fantastic_active_directory_http_login_.md#activedirectory)
* [Error](_packages_fantastic_active_directory_http_login_.md#error)
* [GenerateID](_packages_fantastic_active_directory_http_login_.md#generateid)
* [GetHTTPData](_packages_fantastic_active_directory_http_login_.md#gethttpdata)
* [ParseQuery](_packages_fantastic_active_directory_http_login_.md#parsequery)
* [error](_packages_fantastic_active_directory_http_login_.md#error)
* [get](_packages_fantastic_active_directory_http_login_.md#get)
* [insert](_packages_fantastic_active_directory_http_login_.md#insert)
* [update](_packages_fantastic_active_directory_http_login_.md#update)

### Functions

* [login](_packages_fantastic_active_directory_http_login_.md#login)

## Variables

### ActiveDirectory

• `Const` **ActiveDirectory**: [activeDirectory](_packages_fantastic_active_directory_activedirectory_.md#activedirectory) = require('../activedirectory')

*Defined in [packages/fantastic-active_directory/http/login.js:3](https://github.com/besimorhino/project-fantastic/blob/af5d0de/packages/fantastic-active_directory/http/login.js#L3)*

___

### Error

• `Const` **Error**: [error](_packages_fantastic_active_directory_http_error_.md#error) = require('./error')

*Defined in [packages/fantastic-active_directory/http/login.js:5](https://github.com/besimorhino/project-fantastic/blob/af5d0de/packages/fantastic-active_directory/http/login.js#L5)*

___

### GenerateID

• `Const` **GenerateID**: [generateId](_packages_fantastic_utils_generateid_.md#generateid) = require('fantastic-utils/generateid')

*Defined in [packages/fantastic-active_directory/http/login.js:4](https://github.com/besimorhino/project-fantastic/blob/af5d0de/packages/fantastic-active_directory/http/login.js#L4)*

___

### GetHTTPData

• `Const` **GetHTTPData**: [getHttpData](_packages_fantastic_utils_gethttpdata_.md#gethttpdata) = require('fantastic-utils/gethttpdata')

*Defined in [packages/fantastic-active_directory/http/login.js:1](https://github.com/besimorhino/project-fantastic/blob/af5d0de/packages/fantastic-active_directory/http/login.js#L1)*

___

### ParseQuery

• `Const` **ParseQuery**: [parseQuery](_packages_fantastic_utils_parsequery_.md#parsequery) = require('fantastic-utils/parsequery')

*Defined in [packages/fantastic-active_directory/http/login.js:2](https://github.com/besimorhino/project-fantastic/blob/af5d0de/packages/fantastic-active_directory/http/login.js#L2)*

___

### error

• `Const` **error**: \"Invalid Active Directory login. If the problem persists please contact the server administrator.\" = "Invalid Active Directory login. If the problem persists please contact the server administrator."

*Defined in [packages/fantastic-active_directory/http/login.js:8](https://github.com/besimorhino/project-fantastic/blob/af5d0de/packages/fantastic-active_directory/http/login.js#L8)*

___

### get

•  **get**: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<{} \| undefined>

*Defined in [packages/fantastic-active_directory/http/login.js:6](https://github.com/besimorhino/project-fantastic/blob/af5d0de/packages/fantastic-active_directory/http/login.js#L6)*

___

### insert

•  **insert**: (table: string,row: {}) => Promise\<number>

*Defined in [packages/fantastic-active_directory/http/login.js:6](https://github.com/besimorhino/project-fantastic/blob/af5d0de/packages/fantastic-active_directory/http/login.js#L6)*

___

### update

•  **update**: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise

*Defined in [packages/fantastic-active_directory/http/login.js:6](https://github.com/besimorhino/project-fantastic/blob/af5d0de/packages/fantastic-active_directory/http/login.js#L6)*

## Functions

### login

▸ `Const`**login**(`res`: any, `req`: any): void

*Defined in [packages/fantastic-active_directory/http/login.js:10](https://github.com/besimorhino/project-fantastic/blob/af5d0de/packages/fantastic-active_directory/http/login.js#L10)*

#### Parameters:

Name | Type |
------ | ------ |
`res` | any |
`req` | any |

**Returns:** void
