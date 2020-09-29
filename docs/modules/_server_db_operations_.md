**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "server/db/operations"

# Module: "server/db/operations"

## Index

### Variables

* [db](_server_db_operations_.md#db)

## Variables

### db

• `Const` **db**: { transaction: (mode: number) => Promise\<[Operations](_packages_fantastic_utils_db_types_d_.md#operations)>  } & { all: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<any[]> ; get: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<{} \| undefined> ; insert: (table: string,row: {}) => Promise\<number> ; remove: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise ; run: (queries: string[]) => Promise ; update: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise  } = require('fantastic-utils/db')(require('./path'))

*Defined in [server/db/operations.js:1](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/db/operations.js#L1)*
