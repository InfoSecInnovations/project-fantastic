**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "packages/fantastic-active_directory/http/myaccount"

# Module: "packages/fantastic-active_directory/http/myaccount"

## Index

### Variables

* [Error](_packages_fantastic_active_directory_http_myaccount_.md#error)
* [GetCookie](_packages_fantastic_active_directory_http_myaccount_.md#getcookie)
* [GetRole](_packages_fantastic_active_directory_http_myaccount_.md#getrole)
* [error](_packages_fantastic_active_directory_http_myaccount_.md#error)
* [get](_packages_fantastic_active_directory_http_myaccount_.md#get)

### Functions

* [myAccount](_packages_fantastic_active_directory_http_myaccount_.md#myaccount)

## Variables

### Error

• `Const` **Error**: [error](_packages_fantastic_active_directory_http_error_.md#error) = require('./error')

*Defined in [packages/fantastic-active_directory/http/myaccount.js:4](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/packages/fantastic-active_directory/http/myaccount.js#L4)*

___

### GetCookie

• `Const` **GetCookie**: [getCookie](_packages_fantastic_utils_getcookie_.md#getcookie) = require('fantastic-utils/getcookie')

*Defined in [packages/fantastic-active_directory/http/myaccount.js:1](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/packages/fantastic-active_directory/http/myaccount.js#L1)*

___

### GetRole

• `Const` **GetRole**: [getRole](_packages_fantastic_active_directory_accounts_getrole_.md#getrole) = require('../accounts/getrole')

*Defined in [packages/fantastic-active_directory/http/myaccount.js:2](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/packages/fantastic-active_directory/http/myaccount.js#L2)*

___

### error

• `Const` **error**: \"You must be logged in to do this!\" = "You must be logged in to do this!"

*Defined in [packages/fantastic-active_directory/http/myaccount.js:6](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/packages/fantastic-active_directory/http/myaccount.js#L6)*

___

### get

•  **get**: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<{} \| undefined>

*Defined in [packages/fantastic-active_directory/http/myaccount.js:3](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/packages/fantastic-active_directory/http/myaccount.js#L3)*

## Functions

### myAccount

▸ `Const`**myAccount**(`res`: any, `req`: any): void

*Defined in [packages/fantastic-active_directory/http/myaccount.js:8](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/packages/fantastic-active_directory/http/myaccount.js#L8)*

#### Parameters:

Name | Type |
------ | ------ |
`res` | any |
`req` | any |

**Returns:** void
