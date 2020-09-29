**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "server/db/getnodes/getconnections"

# Module: "server/db/getnodes/getconnections"

## Index

### Variables

* [ConnectionConditions](_server_db_getnodes_getconnections_.md#connectionconditions)

### Functions

* [getConnections](_server_db_getnodes_getconnections_.md#getconnections)

## Variables

### ConnectionConditions

• `Const` **ConnectionConditions**: [connectionConditions](_server_db_getnodes_connectionconditions_.md#connectionconditions) = require('./connectionconditions')

*Defined in [server/db/getnodes/getconnections.js:1](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/db/getnodes/getconnections.js#L1)*

## Functions

### getConnections

▸ `Const`**getConnections**(`db`: { all: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<any[]> ; get: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<{} \| undefined> ; insert: (table: string,row: {}) => Promise\<number> ; remove: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise ; run: (queries: string[]) => Promise ; update: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise  }, `ips`: { ip_id: number  }[], `query`: { access?: [HostAccess](_server_db_types_d_.md#hostaccess)[] ; connection_state?: string[] ; connection_type?: \"different\_ip\" \| \"different\_host\" ; date?: undefined \| number ; max_date?: undefined \| number ; nodes?: number[] ; show_external?: undefined \| false \| true  }, `date_conditions`: { columns: Object\<string, any> \| [][] ; combine?: \"AND\" \| \"OR\" ; compare?: \"=\" \| \"\<\" \| \"\<=\" \| \">\" \| \">=\" \| \"IN\"  }[]): Promise\<any[]>

*Defined in [server/db/getnodes/getconnections.js:10](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/db/getnodes/getconnections.js#L10)*

Get connections from the database originating from these IP addresses

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`db` | { all: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<any[]> ; get: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<{} \| undefined> ; insert: (table: string,row: {}) => Promise\<number> ; remove: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise ; run: (queries: string[]) => Promise ; update: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise  } |  |
`ips` | { ip_id: number  }[] | - |
`query` | { access?: [HostAccess](_server_db_types_d_.md#hostaccess)[] ; connection_state?: string[] ; connection_type?: \"different\_ip\" \| \"different\_host\" ; date?: undefined \| number ; max_date?: undefined \| number ; nodes?: number[] ; show_external?: undefined \| false \| true  } |  |
`date_conditions` | { columns: Object\<string, any> \| [][] ; combine?: \"AND\" \| \"OR\" ; compare?: \"=\" \| \"\<\" \| \"\<=\" \| \">\" \| \">=\" \| \"IN\"  }[] |   |

**Returns:** Promise\<any[]>
