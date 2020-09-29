**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "packages/fantastic-active_directory/accounts/verify"

# Module: "packages/fantastic-active_directory/accounts/verify"

## Index

### Variables

* [GetRole](_packages_fantastic_active_directory_accounts_verify_.md#getrole)
* [get](_packages_fantastic_active_directory_accounts_verify_.md#get)

### Functions

* [verify](_packages_fantastic_active_directory_accounts_verify_.md#verify)

## Variables

### GetRole

• `Const` **GetRole**: [getRole](_packages_fantastic_active_directory_accounts_getrole_.md#getrole) = require('./getrole')

*Defined in [packages/fantastic-active_directory/accounts/verify.js:2](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/packages/fantastic-active_directory/accounts/verify.js#L2)*

___

### get

•  **get**: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<{} \| undefined>

*Defined in [packages/fantastic-active_directory/accounts/verify.js:1](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/packages/fantastic-active_directory/accounts/verify.js#L1)*

## Functions

### verify

▸ `Const`**verify**(`session_id`: string): Promise\<{ role: [UserRole](_packages_fantastic_utils_types_d_.md#userrole) ; user_id: string \| number ; username: string  }>

*Defined in [packages/fantastic-active_directory/accounts/verify.js:9](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/packages/fantastic-active_directory/accounts/verify.js#L9)*

Get user by session ID

#### Parameters:

Name | Type |
------ | ------ |
`session_id` | string |

**Returns:** Promise\<{ role: [UserRole](_packages_fantastic_utils_types_d_.md#userrole) ; user_id: string \| number ; username: string  }>
