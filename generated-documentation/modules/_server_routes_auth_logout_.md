**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "server/routes/auth/logout"

# Module: "server/routes/auth/logout"

## Index

### Variables

* [GetConfig](_server_routes_auth_logout_.md#getconfig)
* [GetCookie](_server_routes_auth_logout_.md#getcookie)
* [GetPackage](_server_routes_auth_logout_.md#getpackage)
* [cookie\_name](_server_routes_auth_logout_.md#cookie_name)

### Functions

* [logOut](_server_routes_auth_logout_.md#logout)
* [redirect](_server_routes_auth_logout_.md#redirect)

## Variables

### GetConfig

• `Const` **GetConfig**: [getConfig](_server_util_getconfig_.md#getconfig) = require('../../util/getconfig')

*Defined in [server/routes/auth/logout.js:2](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/routes/auth/logout.js#L2)*

___

### GetCookie

• `Const` **GetCookie**: [getCookie](_packages_fantastic_utils_getcookie_.md#getcookie) = require('fantastic-utils/getcookie')

*Defined in [server/routes/auth/logout.js:1](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/routes/auth/logout.js#L1)*

___

### GetPackage

• `Const` **GetPackage**: [getPackage](_server_util_getpackage_.md#getpackage) = require('../../util/getpackage')

*Defined in [server/routes/auth/logout.js:3](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/routes/auth/logout.js#L3)*

___

### cookie\_name

• `Const` **cookie\_name**: \"session\_id\" = "session\_id"

*Defined in [server/routes/auth/logout.js:11](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/routes/auth/logout.js#L11)*

## Functions

### logOut

▸ `Const`**logOut**(`res`: any, `req`: any): Promise\<void>

*Defined in [server/routes/auth/logout.js:12](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/routes/auth/logout.js#L12)*

#### Parameters:

Name | Type |
------ | ------ |
`res` | any |
`req` | any |

**Returns:** Promise\<void>

___

### redirect

▸ `Const`**redirect**(`res`: any): void

*Defined in [server/routes/auth/logout.js:5](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/routes/auth/logout.js#L5)*

#### Parameters:

Name | Type |
------ | ------ |
`res` | any |

**Returns:** void
