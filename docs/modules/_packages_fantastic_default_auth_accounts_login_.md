**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "packages/fantastic-default_auth/accounts/login"

# Module: "packages/fantastic-default_auth/accounts/login"

## Index

### Variables

* [BCrypt](_packages_fantastic_default_auth_accounts_login_.md#bcrypt)
* [GenerateID](_packages_fantastic_default_auth_accounts_login_.md#generateid)
* [get](_packages_fantastic_default_auth_accounts_login_.md#get)
* [update](_packages_fantastic_default_auth_accounts_login_.md#update)

### Functions

* [login](_packages_fantastic_default_auth_accounts_login_.md#login)

## Variables

### BCrypt

• `Const` **BCrypt**: any = require('bcrypt')

*Defined in [packages/fantastic-default_auth/accounts/login.js:1](https://github.com/besimorhino/project-fantastic/blob/af5d0de/packages/fantastic-default_auth/accounts/login.js#L1)*

___

### GenerateID

• `Const` **GenerateID**: [generateId](_packages_fantastic_utils_generateid_.md#generateid) = require('fantastic-utils/generateid')

*Defined in [packages/fantastic-default_auth/accounts/login.js:2](https://github.com/besimorhino/project-fantastic/blob/af5d0de/packages/fantastic-default_auth/accounts/login.js#L2)*

___

### get

•  **get**: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<{} \| undefined>

*Defined in [packages/fantastic-default_auth/accounts/login.js:3](https://github.com/besimorhino/project-fantastic/blob/af5d0de/packages/fantastic-default_auth/accounts/login.js#L3)*

___

### update

•  **update**: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise

*Defined in [packages/fantastic-default_auth/accounts/login.js:3](https://github.com/besimorhino/project-fantastic/blob/af5d0de/packages/fantastic-default_auth/accounts/login.js#L3)*

## Functions

### login

▸ `Const`**login**(`json`: any): Promise\<any>

*Defined in [packages/fantastic-default_auth/accounts/login.js:5](https://github.com/besimorhino/project-fantastic/blob/af5d0de/packages/fantastic-default_auth/accounts/login.js#L5)*

#### Parameters:

Name | Type |
------ | ------ |
`json` | any |

**Returns:** Promise\<any>
