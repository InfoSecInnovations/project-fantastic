**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "packages/fantastic-default_auth/index"

# Module: "packages/fantastic-default_auth/index"

## Index

### Variables

* [CreateAccount](_packages_fantastic_default_auth_index_.md#createaccount)
* [GetConfig](_packages_fantastic_default_auth_index_.md#getconfig)
* [Serve](_packages_fantastic_default_auth_index_.md#serve)
* [get](_packages_fantastic_default_auth_index_.md#get)
* [init](_packages_fantastic_default_auth_index_.md#init)

### Functions

* [configure](_packages_fantastic_default_auth_index_.md#configure)

## Variables

### CreateAccount

• `Const` **CreateAccount**: [createAccount](_packages_fantastic_default_auth_accounts_createaccount_.md#createaccount) = require('./accounts/createaccount')

*Defined in [packages/fantastic-default_auth/index.js:2](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/packages/fantastic-default_auth/index.js#L2)*

___

### GetConfig

• `Const` **GetConfig**: [getConfig](_server_util_getconfig_.md#getconfig) = require('./utils/getconfig')

*Defined in [packages/fantastic-default_auth/index.js:4](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/packages/fantastic-default_auth/index.js#L4)*

___

### Serve

• `Const` **Serve**: [serve](_server_routes_serve_.md#serve) = require('./http/serve')

*Defined in [packages/fantastic-default_auth/index.js:3](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/packages/fantastic-default_auth/index.js#L3)*

___

### get

•  **get**: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<{} \| undefined>

*Defined in [packages/fantastic-default_auth/index.js:1](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/packages/fantastic-default_auth/index.js#L1)*

___

### init

•  **init**: [init](_server_db_index_.md#init)

*Defined in [packages/fantastic-default_auth/index.js:1](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/packages/fantastic-default_auth/index.js#L1)*

## Functions

### configure

▸ `Const`**configure**(`app`: any): void

*Defined in [packages/fantastic-default_auth/index.js:15](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/packages/fantastic-default_auth/index.js#L15)*

#### Parameters:

Name | Type |
------ | ------ |
`app` | any |

**Returns:** void
