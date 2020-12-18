**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "packages/fantastic-default_auth/http/myaccount"

# Module: "packages/fantastic-default_auth/http/myaccount"

## Index

### Variables

* [GetCookie](_packages_fantastic_default_auth_http_myaccount_.md#getcookie)
* [error](_packages_fantastic_default_auth_http_myaccount_.md#error)
* [get](_packages_fantastic_default_auth_http_myaccount_.md#get)

### Functions

* [myAccount](_packages_fantastic_default_auth_http_myaccount_.md#myaccount)

## Variables

### GetCookie

• `Const` **GetCookie**: [getCookie](_packages_fantastic_utils_getcookie_.md#getcookie) = require('fantastic-utils/getcookie')

*Defined in [packages/fantastic-default_auth/http/myaccount.js:1](https://github.com/besimorhino/project-fantastic/blob/af5d0de/packages/fantastic-default_auth/http/myaccount.js#L1)*

___

### error

• `Const` **error**: string = JSON.stringify({error: 'You must be logged in to do this!'})

*Defined in [packages/fantastic-default_auth/http/myaccount.js:4](https://github.com/besimorhino/project-fantastic/blob/af5d0de/packages/fantastic-default_auth/http/myaccount.js#L4)*

___

### get

•  **get**: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<{} \| undefined>

*Defined in [packages/fantastic-default_auth/http/myaccount.js:2](https://github.com/besimorhino/project-fantastic/blob/af5d0de/packages/fantastic-default_auth/http/myaccount.js#L2)*

## Functions

### myAccount

▸ `Const`**myAccount**(`res`: any, `req`: any): void

*Defined in [packages/fantastic-default_auth/http/myaccount.js:6](https://github.com/besimorhino/project-fantastic/blob/af5d0de/packages/fantastic-default_auth/http/myaccount.js#L6)*

#### Parameters:

Name | Type |
------ | ------ |
`res` | any |
`req` | any |

**Returns:** void
