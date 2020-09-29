**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "server/db/index"

# Module: "server/db/index"

## Index

### Variables

* [Schema](_server_db_index_.md#schema)
* [operations](_server_db_index_.md#operations)

### Functions

* [init](_server_db_index_.md#init)

## Variables

### Schema

• `Const` **Schema**: string[] = require('./schema')

*Defined in [server/db/index.js:2](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/db/index.js#L2)*

___

### operations

• `Const` **operations**: { transaction: (mode: number) => Promise\<[Operations](_packages_fantastic_utils_db_types_d_.md#operations)>  } & { all: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<any[]> ; get: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<{} \| undefined> ; insert: (table: string,row: {}) => Promise\<number> ; remove: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise ; run: (queries: string[]) => Promise ; update: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise  } = require('./operations')

*Defined in [server/db/index.js:1](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/db/index.js#L1)*

## Functions

### init

▸ `Const`**init**(): any

*Defined in [server/db/index.js:4](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/db/index.js#L4)*

**Returns:** any
