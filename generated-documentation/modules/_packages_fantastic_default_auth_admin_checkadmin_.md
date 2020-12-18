**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "packages/fantastic-default_auth/admin/checkadmin"

# Module: "packages/fantastic-default_auth/admin/checkadmin"

## Index

### Variables

* [GetCookie](_packages_fantastic_default_auth_admin_checkadmin_.md#getcookie)
* [GetHTTPData](_packages_fantastic_default_auth_admin_checkadmin_.md#gethttpdata)
* [failed\_login](_packages_fantastic_default_auth_admin_checkadmin_.md#failed_login)
* [get](_packages_fantastic_default_auth_admin_checkadmin_.md#get)

### Functions

* [checkAdmin](_packages_fantastic_default_auth_admin_checkadmin_.md#checkadmin)

## Variables

### GetCookie

• `Const` **GetCookie**: [getCookie](_packages_fantastic_utils_getcookie_.md#getcookie) = require('fantastic-utils/getcookie')

*Defined in [packages/fantastic-default_auth/admin/checkadmin.js:1](https://github.com/besimorhino/project-fantastic/blob/af5d0de/packages/fantastic-default_auth/admin/checkadmin.js#L1)*

___

### GetHTTPData

• `Const` **GetHTTPData**: [getHttpData](_packages_fantastic_utils_gethttpdata_.md#gethttpdata) = require('fantastic-utils/gethttpdata')

*Defined in [packages/fantastic-default_auth/admin/checkadmin.js:2](https://github.com/besimorhino/project-fantastic/blob/af5d0de/packages/fantastic-default_auth/admin/checkadmin.js#L2)*

___

### failed\_login

• `Const` **failed\_login**: \"you must be logged in as an administrator!\" = "you must be logged in as an administrator!"

*Defined in [packages/fantastic-default_auth/admin/checkadmin.js:5](https://github.com/besimorhino/project-fantastic/blob/af5d0de/packages/fantastic-default_auth/admin/checkadmin.js#L5)*

___

### get

•  **get**: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<{} \| undefined>

*Defined in [packages/fantastic-default_auth/admin/checkadmin.js:3](https://github.com/besimorhino/project-fantastic/blob/af5d0de/packages/fantastic-default_auth/admin/checkadmin.js#L3)*

## Functions

### checkAdmin

▸ `Const`**checkAdmin**(`res`: any, `req`: any): Promise\<any>

*Defined in [packages/fantastic-default_auth/admin/checkadmin.js:7](https://github.com/besimorhino/project-fantastic/blob/af5d0de/packages/fantastic-default_auth/admin/checkadmin.js#L7)*

#### Parameters:

Name | Type |
------ | ------ |
`res` | any |
`req` | any |

**Returns:** Promise\<any>
