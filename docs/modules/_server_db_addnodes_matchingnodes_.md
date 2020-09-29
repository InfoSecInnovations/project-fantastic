**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "server/db/addnodes/matchingnodes"

# Module: "server/db/addnodes/matchingnodes"

## Index

### Variables

* [DefaultIPs](_server_db_addnodes_matchingnodes_.md#defaultips)

### Functions

* [matchingNodes](_server_db_addnodes_matchingnodes_.md#matchingnodes)

## Variables

### DefaultIPs

• `Const` **DefaultIPs**: string[] = require('fantastic-utils/defaultips')

*Defined in [server/db/addnodes/matchingnodes.js:1](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/db/addnodes/matchingnodes.js#L1)*

## Functions

### matchingNodes

▸ `Const`**matchingNodes**(`db`: { all: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<any[]> ; get: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<{} \| undefined> ; insert: (table: string,row: {}) => Promise\<number> ; remove: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise ; run: (queries: string[]) => Promise ; update: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise  }, `node`: { access: [HostAccess](_server_db_types_d_.md#hostaccess) ; hostname?: undefined \| string ; important: boolean ; ips?: string[] ; macs?: Array\<{ mac: string ; vendor: string  }> ; os?: undefined \| string  }): Promise\<any[]>

*Defined in [server/db/addnodes/matchingnodes.js:8](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/db/addnodes/matchingnodes.js#L8)*

Find nodes matching the one we're trying to add

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`db` | { all: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<any[]> ; get: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<{} \| undefined> ; insert: (table: string,row: {}) => Promise\<number> ; remove: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise ; run: (queries: string[]) => Promise ; update: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise  } |  |
`node` | { access: [HostAccess](_server_db_types_d_.md#hostaccess) ; hostname?: undefined \| string ; important: boolean ; ips?: string[] ; macs?: Array\<{ mac: string ; vendor: string  }> ; os?: undefined \| string  } |   |

**Returns:** Promise\<any[]>
