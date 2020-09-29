**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "server/db/types.d"

# Module: "server/db/types.d"

## Index

### Type aliases

* [Connection](_server_db_types_d_.md#connection)
* [HostAccess](_server_db_types_d_.md#hostaccess)
* [Node](_server_db_types_d_.md#node)
* [NodeQuery](_server_db_types_d_.md#nodequery)

## Type aliases

### Connection

Ƭ  **Connection**: { local_address: string ; local_port: number ; process: number ; remote_address: string ; remote_port: number ; state: string  }

*Defined in [server/db/types.d.ts:24](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/db/types.d.ts#L24)*

#### Type declaration:

Name | Type |
------ | ------ |
`local\_address` | string |
`local\_port` | number |
`process` | number |
`remote\_address` | string |
`remote\_port` | number |
`state` | string |

___

### HostAccess

Ƭ  **HostAccess**: \"local\" \| \"remote\" \| \"none\"

*Defined in [server/db/types.d.ts:3](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/db/types.d.ts#L3)*

___

### Node

Ƭ  **Node**: { access: [HostAccess](_server_db_types_d_.md#hostaccess) ; hostname?: undefined \| string ; important: boolean ; ips?: string[] ; macs?: Array\<{ mac: string ; vendor: string  }> ; os?: undefined \| string  }

*Defined in [server/db/types.d.ts:5](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/db/types.d.ts#L5)*

#### Type declaration:

Name | Type |
------ | ------ |
`access` | [HostAccess](_server_db_types_d_.md#hostaccess) |
`hostname?` | undefined \| string |
`important` | boolean |
`ips?` | string[] |
`macs?` | Array\<{ mac: string ; vendor: string  }> |
`os?` | undefined \| string |

___

### NodeQuery

Ƭ  **NodeQuery**: { access?: [HostAccess](_server_db_types_d_.md#hostaccess)[] ; connection_state?: string[] ; connection_type?: \"different\_ip\" \| \"different\_host\" ; date?: undefined \| number ; max_date?: undefined \| number ; nodes?: number[] ; show_external?: undefined \| false \| true  }

*Defined in [server/db/types.d.ts:14](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/db/types.d.ts#L14)*

#### Type declaration:

Name | Type |
------ | ------ |
`access?` | [HostAccess](_server_db_types_d_.md#hostaccess)[] |
`connection\_state?` | string[] |
`connection\_type?` | \"different\_ip\" \| \"different\_host\" |
`date?` | undefined \| number |
`max\_date?` | undefined \| number |
`nodes?` | number[] |
`show\_external?` | undefined \| false \| true |
