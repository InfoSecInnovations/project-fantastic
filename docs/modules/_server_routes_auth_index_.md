**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "server/routes/auth/index"

# Module: "server/routes/auth/index"

## Index

### Variables

* [GetConfig](_server_routes_auth_index_.md#getconfig)
* [GetCookie](_server_routes_auth_index_.md#getcookie)
* [GetPackage](_server_routes_auth_index_.md#getpackage)
* [cookie\_name](_server_routes_auth_index_.md#cookie_name)

### Functions

* [auth](_server_routes_auth_index_.md#auth)

## Variables

### GetConfig

• `Const` **GetConfig**: [getConfig](_server_util_getconfig_.md#getconfig) = require('../../util/getconfig')

*Defined in [server/routes/auth/index.js:2](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/routes/auth/index.js#L2)*

___

### GetCookie

• `Const` **GetCookie**: [getCookie](_packages_fantastic_utils_getcookie_.md#getcookie) = require('fantastic-utils/getcookie')

*Defined in [server/routes/auth/index.js:1](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/routes/auth/index.js#L1)*

___

### GetPackage

• `Const` **GetPackage**: [getPackage](_server_util_getpackage_.md#getpackage) = require('../../util/getpackage')

*Defined in [server/routes/auth/index.js:3](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/routes/auth/index.js#L3)*

___

### cookie\_name

• `Const` **cookie\_name**: \"session\_id\" = "session\_id"

*Defined in [server/routes/auth/index.js:5](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/routes/auth/index.js#L5)*

## Functions

### auth

▸ `Const`**auth**(`header`: string): Promise\<{ role: [UserRole](_packages_fantastic_utils_types_d_.md#userrole) ; user_id: string \| number ; username: string  }>

*Defined in [server/routes/auth/index.js:12](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/routes/auth/index.js#L12)*

Get the user data from the cookie HTTP header

#### Parameters:

Name | Type |
------ | ------ |
`header` | string |

**Returns:** Promise\<{ role: [UserRole](_packages_fantastic_utils_types_d_.md#userrole) ; user_id: string \| number ; username: string  }>
