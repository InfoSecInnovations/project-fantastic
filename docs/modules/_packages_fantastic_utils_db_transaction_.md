**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "packages/fantastic-utils/db/transaction"

# Module: "packages/fantastic-utils/db/transaction"

## Index

### Variables

* [Operations](_packages_fantastic_utils_db_transaction_.md#operations)
* [SQLite3](_packages_fantastic_utils_db_transaction_.md#sqlite3)

### Functions

* [transaction](_packages_fantastic_utils_db_transaction_.md#transaction)

## Variables

### Operations

• `Const` **Operations**: object = require('./operations')

*Defined in [packages/fantastic-utils/db/transaction.js:1](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/packages/fantastic-utils/db/transaction.js#L1)*

#### Type declaration:

Name | Type |
------ | ------ |
`read` | { all: [all](_server_routes_getresults_.md#all) ; get: [get](_server_commands_getcommanddata_.md#get)  } |
`write` | { insert: [insert](_server_routes_serve_.md#insert) ; remove: [remove](_packages_fantastic_default_auth_accounts_deleteaccount_.md#remove) ; run: [run](_server_scripts_postinstall_.md#run) ; update: [update](_server_db_addconnections_index_.md#update)  } |

___

### SQLite3

• `Const` **SQLite3**: any = require('sqlite3')

*Defined in [packages/fantastic-utils/db/transaction.js:2](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/packages/fantastic-utils/db/transaction.js#L2)*

## Functions

### transaction

▸ `Const`**transaction**(`path`: any, `mode`: any): Promise\<any>

*Defined in [packages/fantastic-utils/db/transaction.js:4](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/packages/fantastic-utils/db/transaction.js#L4)*

#### Parameters:

Name | Type |
------ | ------ |
`path` | any |
`mode` | any |

**Returns:** Promise\<any>
