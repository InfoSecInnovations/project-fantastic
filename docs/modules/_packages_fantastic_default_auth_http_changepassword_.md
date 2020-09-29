**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "packages/fantastic-default_auth/http/changepassword"

# Module: "packages/fantastic-default_auth/http/changepassword"

## Index

### Variables

* [Error](_packages_fantastic_default_auth_http_changepassword_.md#error)
* [GenerateID](_packages_fantastic_default_auth_http_changepassword_.md#generateid)
* [GetCookie](_packages_fantastic_default_auth_http_changepassword_.md#getcookie)
* [GetHTTPData](_packages_fantastic_default_auth_http_changepassword_.md#gethttpdata)
* [ParseQuery](_packages_fantastic_default_auth_http_changepassword_.md#parsequery)
* [SetPassword](_packages_fantastic_default_auth_http_changepassword_.md#setpassword)
* [Success](_packages_fantastic_default_auth_http_changepassword_.md#success)
* [get](_packages_fantastic_default_auth_http_changepassword_.md#get)

### Functions

* [changePassword](_packages_fantastic_default_auth_http_changepassword_.md#changepassword)
* [error](_packages_fantastic_default_auth_http_changepassword_.md#error)

## Variables

### Error

• `Const` **Error**: [error](_packages_fantastic_active_directory_http_error_.md#error) = require('./error')

*Defined in [packages/fantastic-default_auth/http/changepassword.js:8](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/packages/fantastic-default_auth/http/changepassword.js#L8)*

___

### GenerateID

• `Const` **GenerateID**: [generateId](_packages_fantastic_utils_generateid_.md#generateid) = require('fantastic-utils/generateid')

*Defined in [packages/fantastic-default_auth/http/changepassword.js:5](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/packages/fantastic-default_auth/http/changepassword.js#L5)*

___

### GetCookie

• `Const` **GetCookie**: [getCookie](_packages_fantastic_utils_getcookie_.md#getcookie) = require('fantastic-utils/getcookie')

*Defined in [packages/fantastic-default_auth/http/changepassword.js:3](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/packages/fantastic-default_auth/http/changepassword.js#L3)*

___

### GetHTTPData

• `Const` **GetHTTPData**: [getHttpData](_packages_fantastic_utils_gethttpdata_.md#gethttpdata) = require('fantastic-utils/gethttpdata')

*Defined in [packages/fantastic-default_auth/http/changepassword.js:1](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/packages/fantastic-default_auth/http/changepassword.js#L1)*

___

### ParseQuery

• `Const` **ParseQuery**: [parseQuery](_packages_fantastic_utils_parsequery_.md#parsequery) = require('fantastic-utils/parsequery')

*Defined in [packages/fantastic-default_auth/http/changepassword.js:6](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/packages/fantastic-default_auth/http/changepassword.js#L6)*

___

### SetPassword

• `Const` **SetPassword**: [setPassword](_packages_fantastic_default_auth_accounts_setpassword_.md#setpassword) = require('../accounts/setpassword')

*Defined in [packages/fantastic-default_auth/http/changepassword.js:2](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/packages/fantastic-default_auth/http/changepassword.js#L2)*

___

### Success

• `Const` **Success**: [success](_packages_fantastic_default_auth_http_success_.md#success) = require('./success')

*Defined in [packages/fantastic-default_auth/http/changepassword.js:7](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/packages/fantastic-default_auth/http/changepassword.js#L7)*

___

### get

•  **get**: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<{} \| undefined>

*Defined in [packages/fantastic-default_auth/http/changepassword.js:4](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/packages/fantastic-default_auth/http/changepassword.js#L4)*

## Functions

### changePassword

▸ `Const`**changePassword**(`res`: any, `req`: any): void

*Defined in [packages/fantastic-default_auth/http/changepassword.js:12](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/packages/fantastic-default_auth/http/changepassword.js#L12)*

#### Parameters:

Name | Type |
------ | ------ |
`res` | any |
`req` | any |

**Returns:** void

___

### error

▸ `Const`**error**(`res`: any): void

*Defined in [packages/fantastic-default_auth/http/changepassword.js:10](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/packages/fantastic-default_auth/http/changepassword.js#L10)*

#### Parameters:

Name | Type |
------ | ------ |
`res` | any |

**Returns:** void
