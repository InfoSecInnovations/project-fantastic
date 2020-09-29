**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "packages/fantastic-default_auth/db/index"

# Module: "packages/fantastic-default_auth/db/index"

## Index

### Variables

* [Schema](_packages_fantastic_default_auth_db_index_.md#schema)
* [db](_packages_fantastic_default_auth_db_index_.md#db)

### Functions

* [init](_packages_fantastic_default_auth_db_index_.md#init)

## Variables

### Schema

• `Const` **Schema**: string[] = require('./schema')

*Defined in [packages/fantastic-default_auth/db/index.js:2](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/packages/fantastic-default_auth/db/index.js#L2)*

___

### db

• `Const` **db**: { transaction: (mode: number) => Promise\<[Operations](_packages_fantastic_utils_db_types_d_.md#operations)>  } & { all: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<any[]> ; get: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<{} \| undefined> ; insert: (table: string,row: {}) => Promise\<number> ; remove: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise ; run: (queries: string[]) => Promise ; update: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise  } = require('fantastic-utils/db')(require('./path'))

*Defined in [packages/fantastic-default_auth/db/index.js:1](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/packages/fantastic-default_auth/db/index.js#L1)*

## Functions

### init

▸ `Const`**init**(): any

*Defined in [packages/fantastic-default_auth/db/index.js:4](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/packages/fantastic-default_auth/db/index.js#L4)*

**Returns:** any
