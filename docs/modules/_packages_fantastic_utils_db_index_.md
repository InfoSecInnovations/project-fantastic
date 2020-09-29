**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "packages/fantastic-utils/db/index"

# Module: "packages/fantastic-utils/db/index"

## Index

### Variables

* [Operations](_packages_fantastic_utils_db_index_.md#operations)
* [SQLite3](_packages_fantastic_utils_db_index_.md#sqlite3)
* [Transaction](_packages_fantastic_utils_db_index_.md#transaction)

### Functions

* [execute](_packages_fantastic_utils_db_index_.md#execute)
* [init](_packages_fantastic_utils_db_index_.md#init)

## Variables

### Operations

• `Const` **Operations**: object = require('./operations')

*Defined in [packages/fantastic-utils/db/index.js:2](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/packages/fantastic-utils/db/index.js#L2)*

#### Type declaration:

Name | Type |
------ | ------ |
`read` | { all: [all](_server_routes_getresults_.md#all) ; get: [get](_server_commands_getcommanddata_.md#get)  } |
`write` | { insert: [insert](_server_routes_serve_.md#insert) ; remove: [remove](_packages_fantastic_default_auth_accounts_deleteaccount_.md#remove) ; run: [run](_server_scripts_postinstall_.md#run) ; update: [update](_server_db_addconnections_index_.md#update)  } |

___

### SQLite3

• `Const` **SQLite3**: any = require('sqlite3')

*Defined in [packages/fantastic-utils/db/index.js:1](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/packages/fantastic-utils/db/index.js#L1)*

___

### Transaction

• `Const` **Transaction**: [transaction](_server_db_addconnections_read_index_.md#transaction) = require('./transaction')

*Defined in [packages/fantastic-utils/db/index.js:3](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/packages/fantastic-utils/db/index.js#L3)*

## Functions

### execute

▸ `Const`**execute**(`path`: any, `func`: any, `mode`: any): Promise\<any>

*Defined in [packages/fantastic-utils/db/index.js:5](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/packages/fantastic-utils/db/index.js#L5)*

#### Parameters:

Name | Type |
------ | ------ |
`path` | any |
`func` | any |
`mode` | any |

**Returns:** Promise\<any>

___

### init

▸ `Const`**init**(`path`: string): { transaction: (mode: number) => Promise\<[Operations](_packages_fantastic_utils_db_index_.md#operations)>  } & { all: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<any[]> ; get: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<{} \| undefined> ; insert: (table: string,row: {}) => Promise\<number> ; remove: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise ; run: (queries: string[]) => Promise ; update: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise  }

*Defined in [packages/fantastic-utils/db/index.js:17](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/packages/fantastic-utils/db/index.js#L17)*

Create a new database object to communicate with the database at the given path.

#### Parameters:

Name | Type |
------ | ------ |
`path` | string |

**Returns:** { transaction: (mode: number) => Promise\<[Operations](_packages_fantastic_utils_db_index_.md#operations)>  } & { all: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<any[]> ; get: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<{} \| undefined> ; insert: (table: string,row: {}) => Promise\<number> ; remove: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise ; run: (queries: string[]) => Promise ; update: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise  }

database object
