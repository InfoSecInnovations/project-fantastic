**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "packages/fantastic-active_directory/accounts/getbyid"

# Module: "packages/fantastic-active_directory/accounts/getbyid"

## Index

### Variables

* [GetRole](_packages_fantastic_active_directory_accounts_getbyid_.md#getrole)
* [get](_packages_fantastic_active_directory_accounts_getbyid_.md#get)

### Functions

* [getByID](_packages_fantastic_active_directory_accounts_getbyid_.md#getbyid)

## Variables

### GetRole

• `Const` **GetRole**: [getRole](_packages_fantastic_active_directory_accounts_getrole_.md#getrole) = require('./getrole')

*Defined in [packages/fantastic-active_directory/accounts/getbyid.js:2](https://github.com/besimorhino/project-fantastic/blob/af5d0de/packages/fantastic-active_directory/accounts/getbyid.js#L2)*

___

### get

•  **get**: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<{} \| undefined>

*Defined in [packages/fantastic-active_directory/accounts/getbyid.js:1](https://github.com/besimorhino/project-fantastic/blob/af5d0de/packages/fantastic-active_directory/accounts/getbyid.js#L1)*

## Functions

### getByID

▸ `Const`**getByID**(`id`: string \| number): Promise\<[User](_packages_fantastic_utils_types_d_.md#user)>

*Defined in [packages/fantastic-active_directory/accounts/getbyid.js:9](https://github.com/besimorhino/project-fantastic/blob/af5d0de/packages/fantastic-active_directory/accounts/getbyid.js#L9)*

Get user by database ID

#### Parameters:

Name | Type |
------ | ------ |
`id` | string \| number |

**Returns:** Promise\<[User](_packages_fantastic_utils_types_d_.md#user)>
