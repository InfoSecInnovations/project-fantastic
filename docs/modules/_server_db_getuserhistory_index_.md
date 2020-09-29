**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "server/db/getuserhistory/index"

# Module: "server/db/getuserhistory/index"

## Index

### Variables

* [GetData](_server_db_getuserhistory_index_.md#getdata)
* [GetFavorites](_server_db_getuserhistory_index_.md#getfavorites)
* [OPEN\_READONLY](_server_db_getuserhistory_index_.md#open_readonly)
* [transaction](_server_db_getuserhistory_index_.md#transaction)

### Functions

* [getUserHistory](_server_db_getuserhistory_index_.md#getuserhistory)

## Variables

### GetData

• `Const` **GetData**: [getData](_server_db_getuserhistory_getdata_.md#getdata) = require('./getdata')

*Defined in [server/db/getuserhistory/index.js:2](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/db/getuserhistory/index.js#L2)*

___

### GetFavorites

• `Const` **GetFavorites**: [getFavorites](_server_db_getuserhistory_getuserfavorites_.md#getfavorites) = require('./getuserfavorites')

*Defined in [server/db/getuserhistory/index.js:3](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/db/getuserhistory/index.js#L3)*

___

### OPEN\_READONLY

•  **OPEN\_READONLY**: any

*Defined in [server/db/getuserhistory/index.js:1](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/db/getuserhistory/index.js#L1)*

___

### transaction

•  **transaction**: (mode: number) => Promise\<[Operations](_packages_fantastic_utils_db_types_d_.md#operations)>

*Defined in [server/db/getuserhistory/index.js:1](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/db/getuserhistory/index.js#L1)*

## Functions

### getUserHistory

▸ `Const`**getUserHistory**(`user`: { role: [UserRole](_packages_fantastic_utils_types_d_.md#userrole) ; user_id: string \| number ; username: string  }, `options`: undefined \| { count?: undefined \| number ; page?: undefined \| number  }): Promise\<{ favorites: any[] ; is_last: boolean ; results: any[]  }>

*Defined in [server/db/getuserhistory/index.js:10](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/db/getuserhistory/index.js#L10)*

#### Parameters:

Name | Type |
------ | ------ |
`user` | { role: [UserRole](_packages_fantastic_utils_types_d_.md#userrole) ; user_id: string \| number ; username: string  } |
`options` | undefined \| { count?: undefined \| number ; page?: undefined \| number  } |

**Returns:** Promise\<{ favorites: any[] ; is_last: boolean ; results: any[]  }>
