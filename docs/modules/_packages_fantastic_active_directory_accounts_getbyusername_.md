**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "packages/fantastic-active_directory/accounts/getbyusername"

# Module: "packages/fantastic-active_directory/accounts/getbyusername"

## Index

### Variables

* [GetRole](_packages_fantastic_active_directory_accounts_getbyusername_.md#getrole)
* [get](_packages_fantastic_active_directory_accounts_getbyusername_.md#get)

### Functions

* [getByUsername](_packages_fantastic_active_directory_accounts_getbyusername_.md#getbyusername)

## Variables

### GetRole

• `Const` **GetRole**: [getRole](_packages_fantastic_active_directory_accounts_getrole_.md#getrole) = require('./getrole')

*Defined in [packages/fantastic-active_directory/accounts/getbyusername.js:2](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/packages/fantastic-active_directory/accounts/getbyusername.js#L2)*

___

### get

•  **get**: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<{} \| undefined>

*Defined in [packages/fantastic-active_directory/accounts/getbyusername.js:1](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/packages/fantastic-active_directory/accounts/getbyusername.js#L1)*

## Functions

### getByUsername

▸ `Const`**getByUsername**(`username`: string): Promise\<{ role: [UserRole](_packages_fantastic_utils_types_d_.md#userrole) ; user_id: string \| number ; username: string  }>

*Defined in [packages/fantastic-active_directory/accounts/getbyusername.js:9](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/packages/fantastic-active_directory/accounts/getbyusername.js#L9)*

#### Parameters:

Name | Type |
------ | ------ |
`username` | string |

**Returns:** Promise\<{ role: [UserRole](_packages_fantastic_utils_types_d_.md#userrole) ; user_id: string \| number ; username: string  }>
