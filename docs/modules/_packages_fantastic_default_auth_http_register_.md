**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "packages/fantastic-default_auth/http/register"

# Module: "packages/fantastic-default_auth/http/register"

## Index

### Variables

* [CreateAccount](_packages_fantastic_default_auth_http_register_.md#createaccount)
* [Error](_packages_fantastic_default_auth_http_register_.md#error)
* [GetConfig](_packages_fantastic_default_auth_http_register_.md#getconfig)
* [GetHTTPData](_packages_fantastic_default_auth_http_register_.md#gethttpdata)
* [ParseQuery](_packages_fantastic_default_auth_http_register_.md#parsequery)
* [Success](_packages_fantastic_default_auth_http_register_.md#success)
* [get](_packages_fantastic_default_auth_http_register_.md#get)

### Functions

* [register](_packages_fantastic_default_auth_http_register_.md#register)

## Variables

### CreateAccount

• `Const` **CreateAccount**: [createAccount](_packages_fantastic_default_auth_accounts_createaccount_.md#createaccount) = require('../accounts/createaccount')

*Defined in [packages/fantastic-default_auth/http/register.js:4](https://github.com/besimorhino/project-fantastic/blob/af5d0de/packages/fantastic-default_auth/http/register.js#L4)*

___

### Error

• `Const` **Error**: [error](_packages_fantastic_active_directory_http_error_.md#error) = require('./error')

*Defined in [packages/fantastic-default_auth/http/register.js:2](https://github.com/besimorhino/project-fantastic/blob/af5d0de/packages/fantastic-default_auth/http/register.js#L2)*

___

### GetConfig

• `Const` **GetConfig**: [getConfig](_server_util_getconfig_.md#getconfig) = require('../utils/getconfig')

*Defined in [packages/fantastic-default_auth/http/register.js:7](https://github.com/besimorhino/project-fantastic/blob/af5d0de/packages/fantastic-default_auth/http/register.js#L7)*

___

### GetHTTPData

• `Const` **GetHTTPData**: [getHttpData](_packages_fantastic_utils_gethttpdata_.md#gethttpdata) = require('fantastic-utils/gethttpdata')

*Defined in [packages/fantastic-default_auth/http/register.js:5](https://github.com/besimorhino/project-fantastic/blob/af5d0de/packages/fantastic-default_auth/http/register.js#L5)*

___

### ParseQuery

• `Const` **ParseQuery**: [parseQuery](_packages_fantastic_utils_parsequery_.md#parsequery) = require('fantastic-utils/parsequery')

*Defined in [packages/fantastic-default_auth/http/register.js:6](https://github.com/besimorhino/project-fantastic/blob/af5d0de/packages/fantastic-default_auth/http/register.js#L6)*

___

### Success

• `Const` **Success**: [success](_packages_fantastic_default_auth_http_success_.md#success) = require('./success')

*Defined in [packages/fantastic-default_auth/http/register.js:1](https://github.com/besimorhino/project-fantastic/blob/af5d0de/packages/fantastic-default_auth/http/register.js#L1)*

___

### get

•  **get**: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<{} \| undefined>

*Defined in [packages/fantastic-default_auth/http/register.js:3](https://github.com/besimorhino/project-fantastic/blob/af5d0de/packages/fantastic-default_auth/http/register.js#L3)*

## Functions

### register

▸ `Const`**register**(`res`: any, `req`: any): void

*Defined in [packages/fantastic-default_auth/http/register.js:9](https://github.com/besimorhino/project-fantastic/blob/af5d0de/packages/fantastic-default_auth/http/register.js#L9)*

#### Parameters:

Name | Type |
------ | ------ |
`res` | any |
`req` | any |

**Returns:** void
