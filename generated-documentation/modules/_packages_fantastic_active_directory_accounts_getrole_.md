**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "packages/fantastic-active_directory/accounts/getrole"

# Module: "packages/fantastic-active_directory/accounts/getrole"

## Index

### Variables

* [ActiveDirectory](_packages_fantastic_active_directory_accounts_getrole_.md#activedirectory)
* [GetConfig](_packages_fantastic_active_directory_accounts_getrole_.md#getconfig)

### Functions

* [getRole](_packages_fantastic_active_directory_accounts_getrole_.md#getrole)

## Variables

### ActiveDirectory

• `Const` **ActiveDirectory**: [activeDirectory](_packages_fantastic_active_directory_activedirectory_.md#activedirectory) = require('../activedirectory')

*Defined in [packages/fantastic-active_directory/accounts/getrole.js:2](https://github.com/besimorhino/project-fantastic/blob/af5d0de/packages/fantastic-active_directory/accounts/getrole.js#L2)*

___

### GetConfig

• `Const` **GetConfig**: [getConfig](_server_util_getconfig_.md#getconfig) = require('../utils/getconfig')

*Defined in [packages/fantastic-active_directory/accounts/getrole.js:1](https://github.com/besimorhino/project-fantastic/blob/af5d0de/packages/fantastic-active_directory/accounts/getrole.js#L1)*

## Functions

### getRole

▸ `Const`**getRole**(`username`: any): Promise\<undefined \| \"user\" \| \"elevated\" \| \"admin\">

*Defined in [packages/fantastic-active_directory/accounts/getrole.js:4](https://github.com/besimorhino/project-fantastic/blob/af5d0de/packages/fantastic-active_directory/accounts/getrole.js#L4)*

#### Parameters:

Name | Type |
------ | ------ |
`username` | any |

**Returns:** Promise\<undefined \| \"user\" \| \"elevated\" \| \"admin\">
