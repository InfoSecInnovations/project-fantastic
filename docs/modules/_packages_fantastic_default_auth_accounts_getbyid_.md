**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "packages/fantastic-default_auth/accounts/getbyid"

# Module: "packages/fantastic-default_auth/accounts/getbyid"

## Index

### Variables

* [get](_packages_fantastic_default_auth_accounts_getbyid_.md#get)

### Functions

* [getByID](_packages_fantastic_default_auth_accounts_getbyid_.md#getbyid)

## Variables

### get

•  **get**: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<{} \| undefined>

*Defined in [packages/fantastic-default_auth/accounts/getbyid.js:1](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/packages/fantastic-default_auth/accounts/getbyid.js#L1)*

## Functions

### getByID

▸ `Const`**getByID**(`id`: string \| number): Promise\<{ role: [UserRole](_packages_fantastic_utils_types_d_.md#userrole) ; user_id: string \| number ; username: string  }>

*Defined in [packages/fantastic-default_auth/accounts/getbyid.js:8](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/packages/fantastic-default_auth/accounts/getbyid.js#L8)*

Get user data by database ID

#### Parameters:

Name | Type |
------ | ------ |
`id` | string \| number |

**Returns:** Promise\<{ role: [UserRole](_packages_fantastic_utils_types_d_.md#userrole) ; user_id: string \| number ; username: string  }>
