**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "packages/fantastic-default_auth/accounts/createaccount"

# Module: "packages/fantastic-default_auth/accounts/createaccount"

## Index

### Variables

* [BCrypt](_packages_fantastic_default_auth_accounts_createaccount_.md#bcrypt)
* [GenerateID](_packages_fantastic_default_auth_accounts_createaccount_.md#generateid)
* [GetConfig](_packages_fantastic_default_auth_accounts_createaccount_.md#getconfig)
* [insert](_packages_fantastic_default_auth_accounts_createaccount_.md#insert)

### Functions

* [createAccount](_packages_fantastic_default_auth_accounts_createaccount_.md#createaccount)

## Variables

### BCrypt

• `Const` **BCrypt**: any = require('bcrypt')

*Defined in [packages/fantastic-default_auth/accounts/createaccount.js:1](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/packages/fantastic-default_auth/accounts/createaccount.js#L1)*

___

### GenerateID

• `Const` **GenerateID**: [generateId](_packages_fantastic_utils_generateid_.md#generateid) = require('fantastic-utils/generateid')

*Defined in [packages/fantastic-default_auth/accounts/createaccount.js:2](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/packages/fantastic-default_auth/accounts/createaccount.js#L2)*

___

### GetConfig

• `Const` **GetConfig**: [getConfig](_server_util_getconfig_.md#getconfig) = require('../utils/getconfig')

*Defined in [packages/fantastic-default_auth/accounts/createaccount.js:4](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/packages/fantastic-default_auth/accounts/createaccount.js#L4)*

___

### insert

•  **insert**: (table: string,row: {}) => Promise\<number>

*Defined in [packages/fantastic-default_auth/accounts/createaccount.js:3](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/packages/fantastic-default_auth/accounts/createaccount.js#L3)*

## Functions

### createAccount

▸ `Const`**createAccount**(`username`: any, `password`: any, `role`: any): Promise\<any>

*Defined in [packages/fantastic-default_auth/accounts/createaccount.js:6](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/packages/fantastic-default_auth/accounts/createaccount.js#L6)*

#### Parameters:

Name | Type |
------ | ------ |
`username` | any |
`password` | any |
`role` | any |

**Returns:** Promise\<any>
