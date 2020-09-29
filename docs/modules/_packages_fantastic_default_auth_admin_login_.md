**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "packages/fantastic-default_auth/admin/login"

# Module: "packages/fantastic-default_auth/admin/login"

## Index

### Variables

* [Error](_packages_fantastic_default_auth_admin_login_.md#error)
* [GenerateID](_packages_fantastic_default_auth_admin_login_.md#generateid)
* [GetHTTPData](_packages_fantastic_default_auth_admin_login_.md#gethttpdata)
* [Login](_packages_fantastic_default_auth_admin_login_.md#login)
* [ParseQuery](_packages_fantastic_default_auth_admin_login_.md#parsequery)
* [Serve](_packages_fantastic_default_auth_admin_login_.md#serve)
* [get](_packages_fantastic_default_auth_admin_login_.md#get)
* [update](_packages_fantastic_default_auth_admin_login_.md#update)

### Functions

* [login](_packages_fantastic_default_auth_admin_login_.md#login)
* [success](_packages_fantastic_default_auth_admin_login_.md#success)

## Variables

### Error

• `Const` **Error**: [error](_packages_fantastic_active_directory_http_error_.md#error) = require('../http/error')

*Defined in [packages/fantastic-default_auth/admin/login.js:7](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/packages/fantastic-default_auth/admin/login.js#L7)*

___

### GenerateID

• `Const` **GenerateID**: [generateId](_packages_fantastic_utils_generateid_.md#generateid) = require('fantastic-utils/generateid')

*Defined in [packages/fantastic-default_auth/admin/login.js:4](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/packages/fantastic-default_auth/admin/login.js#L4)*

___

### GetHTTPData

• `Const` **GetHTTPData**: [getHttpData](_packages_fantastic_utils_gethttpdata_.md#gethttpdata) = require('fantastic-utils/gethttpdata')

*Defined in [packages/fantastic-default_auth/admin/login.js:6](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/packages/fantastic-default_auth/admin/login.js#L6)*

___

### Login

• `Const` **Login**: [login](_packages_fantastic_active_directory_http_login_.md#login) = require('../accounts/login')

*Defined in [packages/fantastic-default_auth/admin/login.js:1](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/packages/fantastic-default_auth/admin/login.js#L1)*

___

### ParseQuery

• `Const` **ParseQuery**: [parseQuery](_packages_fantastic_utils_parsequery_.md#parsequery) = require('fantastic-utils/parsequery')

*Defined in [packages/fantastic-default_auth/admin/login.js:3](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/packages/fantastic-default_auth/admin/login.js#L3)*

___

### Serve

• `Const` **Serve**: [serve](_server_routes_serve_.md#serve) = require('../http/serve')

*Defined in [packages/fantastic-default_auth/admin/login.js:2](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/packages/fantastic-default_auth/admin/login.js#L2)*

___

### get

•  **get**: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<{} \| undefined>

*Defined in [packages/fantastic-default_auth/admin/login.js:5](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/packages/fantastic-default_auth/admin/login.js#L5)*

___

### update

•  **update**: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise

*Defined in [packages/fantastic-default_auth/admin/login.js:5](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/packages/fantastic-default_auth/admin/login.js#L5)*

## Functions

### login

▸ `Const`**login**(`res`: any, `req`: any): void

*Defined in [packages/fantastic-default_auth/admin/login.js:18](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/packages/fantastic-default_auth/admin/login.js#L18)*

#### Parameters:

Name | Type |
------ | ------ |
`res` | any |
`req` | any |

**Returns:** void

___

### success

▸ `Const`**success**(`id`: any): Promise\<any>

*Defined in [packages/fantastic-default_auth/admin/login.js:9](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/packages/fantastic-default_auth/admin/login.js#L9)*

#### Parameters:

Name | Type |
------ | ------ |
`id` | any |

**Returns:** Promise\<any>
