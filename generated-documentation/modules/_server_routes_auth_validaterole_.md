**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "server/routes/auth/validaterole"

# Module: "server/routes/auth/validaterole"

## Index

### Variables

* [Auth](_server_routes_auth_validaterole_.md#auth)
* [HasRole](_server_routes_auth_validaterole_.md#hasrole)

### Functions

* [validateRole](_server_routes_auth_validaterole_.md#validaterole)

## Variables

### Auth

• `Const` **Auth**: [auth](_server_routes_auth_index_.md#auth) = require('./index')

*Defined in [server/routes/auth/validaterole.js:1](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/routes/auth/validaterole.js#L1)*

___

### HasRole

• `Const` **HasRole**: [hasRole](_packages_fantastic_utils_hasrole_.md#hasrole) = require('fantastic-utils/hasrole')

*Defined in [server/routes/auth/validaterole.js:2](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/routes/auth/validaterole.js#L2)*

## Functions

### validateRole

▸ `Const`**validateRole**(`header`: any, `role`: any): Promise\<boolean>

*Defined in [server/routes/auth/validaterole.js:4](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/routes/auth/validaterole.js#L4)*

#### Parameters:

Name | Type |
------ | ------ |
`header` | any |
`role` | any |

**Returns:** Promise\<boolean>
