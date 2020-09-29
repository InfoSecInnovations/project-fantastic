**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "packages/fantastic-default_auth/accounts/setpassword"

# Module: "packages/fantastic-default_auth/accounts/setpassword"

## Index

### Variables

* [BCrypt](_packages_fantastic_default_auth_accounts_setpassword_.md#bcrypt)
* [GetConfig](_packages_fantastic_default_auth_accounts_setpassword_.md#getconfig)
* [update](_packages_fantastic_default_auth_accounts_setpassword_.md#update)

### Functions

* [setPassword](_packages_fantastic_default_auth_accounts_setpassword_.md#setpassword)

## Variables

### BCrypt

• `Const` **BCrypt**: any = require('bcrypt')

*Defined in [packages/fantastic-default_auth/accounts/setpassword.js:1](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/packages/fantastic-default_auth/accounts/setpassword.js#L1)*

___

### GetConfig

• `Const` **GetConfig**: [getConfig](_server_util_getconfig_.md#getconfig) = require('../utils/getconfig')

*Defined in [packages/fantastic-default_auth/accounts/setpassword.js:3](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/packages/fantastic-default_auth/accounts/setpassword.js#L3)*

___

### update

•  **update**: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise

*Defined in [packages/fantastic-default_auth/accounts/setpassword.js:2](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/packages/fantastic-default_auth/accounts/setpassword.js#L2)*

## Functions

### setPassword

▸ `Const`**setPassword**(`username`: any, `password`: any): Promise\<any>

*Defined in [packages/fantastic-default_auth/accounts/setpassword.js:5](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/packages/fantastic-default_auth/accounts/setpassword.js#L5)*

#### Parameters:

Name | Type |
------ | ------ |
`username` | any |
`password` | any |

**Returns:** Promise\<any>
