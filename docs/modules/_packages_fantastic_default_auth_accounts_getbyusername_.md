**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "packages/fantastic-default_auth/accounts/getbyusername"

# Module: "packages/fantastic-default_auth/accounts/getbyusername"

## Index

### Variables

* [get](_packages_fantastic_default_auth_accounts_getbyusername_.md#get)

### Functions

* [getByUsername](_packages_fantastic_default_auth_accounts_getbyusername_.md#getbyusername)

## Variables

### get

•  **get**: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<{} \| undefined>

*Defined in [packages/fantastic-default_auth/accounts/getbyusername.js:1](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/packages/fantastic-default_auth/accounts/getbyusername.js#L1)*

## Functions

### getByUsername

▸ `Const`**getByUsername**(`username`: string): Promise\<{ role: [UserRole](_packages_fantastic_utils_types_d_.md#userrole) ; user_id: string \| number ; username: string  }>

*Defined in [packages/fantastic-default_auth/accounts/getbyusername.js:8](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/packages/fantastic-default_auth/accounts/getbyusername.js#L8)*

#### Parameters:

Name | Type |
------ | ------ |
`username` | string |

**Returns:** Promise\<{ role: [UserRole](_packages_fantastic_utils_types_d_.md#userrole) ; user_id: string \| number ; username: string  }>
