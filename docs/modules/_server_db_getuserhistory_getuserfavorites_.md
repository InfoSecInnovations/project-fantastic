**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "server/db/getuserhistory/getuserfavorites"

# Module: "server/db/getuserhistory/getuserfavorites"

## Index

### Variables

* [GetData](_server_db_getuserhistory_getuserfavorites_.md#getdata)

### Functions

* [getFavorites](_server_db_getuserhistory_getuserfavorites_.md#getfavorites)

## Variables

### GetData

• `Const` **GetData**: [getData](_server_db_getuserhistory_getdata_.md#getdata) = require('./getdata')

*Defined in [server/db/getuserhistory/getuserfavorites.js:1](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/db/getuserhistory/getuserfavorites.js#L1)*

## Functions

### getFavorites

▸ `Const`**getFavorites**(`db`: { all: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<any[]> ; get: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<{} \| undefined> ; insert: (table: string,row: {}) => Promise\<number> ; remove: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise ; run: (queries: string[]) => Promise ; update: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise  }, `user`: { role: [UserRole](_packages_fantastic_utils_types_d_.md#userrole) ; user_id: string \| number ; username: string  }): Promise\<any[]>

*Defined in [server/db/getuserhistory/getuserfavorites.js:8](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/db/getuserhistory/getuserfavorites.js#L8)*

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`db` | { all: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<any[]> ; get: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<{} \| undefined> ; insert: (table: string,row: {}) => Promise\<number> ; remove: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise ; run: (queries: string[]) => Promise ; update: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise  } |  |
`user` | { role: [UserRole](_packages_fantastic_utils_types_d_.md#userrole) ; user_id: string \| number ; username: string  } |   |

**Returns:** Promise\<any[]>
