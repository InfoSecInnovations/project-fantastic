**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "server/db/getnodes/connectionconditions"

# Module: "server/db/getnodes/connectionconditions"

## Index

### Functions

* [connectionConditions](_server_db_getnodes_connectionconditions_.md#connectionconditions)

## Functions

### connectionConditions

▸ `Const`**connectionConditions**(`dir`: \"from\" \| \"to\", `ips`: { ip_id: number  }[], `query`: { access?: [HostAccess](_server_db_types_d_.md#hostaccess)[] ; connection_state?: string[] ; connection_type?: \"different\_ip\" \| \"different\_host\" ; date?: undefined \| number ; max_date?: undefined \| number ; nodes?: number[] ; show_external?: undefined \| false \| true  }): { columns: Object\<string, any> \| [][] ; combine?: \"AND\" \| \"OR\" ; compare?: \"=\" \| \"\<\" \| \"\<=\" \| \">\" \| \">=\" \| \"IN\"  }[]

*Defined in [server/db/getnodes/connectionconditions.js:8](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/db/getnodes/connectionconditions.js#L8)*

#### Parameters:

Name | Type |
------ | ------ |
`dir` | \"from\" \| \"to\" |
`ips` | { ip_id: number  }[] |
`query` | { access?: [HostAccess](_server_db_types_d_.md#hostaccess)[] ; connection_state?: string[] ; connection_type?: \"different\_ip\" \| \"different\_host\" ; date?: undefined \| number ; max_date?: undefined \| number ; nodes?: number[] ; show_external?: undefined \| false \| true  } |

**Returns:** { columns: Object\<string, any> \| [][] ; combine?: \"AND\" \| \"OR\" ; compare?: \"=\" \| \"\<\" \| \"\<=\" \| \">\" \| \">=\" \| \"IN\"  }[]
