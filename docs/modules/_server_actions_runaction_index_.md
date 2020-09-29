**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "server/actions/runaction/index"

# Module: "server/actions/runaction/index"

## Index

### Variables

* [GetPackagedData](_server_actions_runaction_index_.md#getpackageddata)
* [RunFunction](_server_actions_runaction_index_.md#runfunction)

### Functions

* [runAction](_server_actions_runaction_index_.md#runaction)

## Variables

### GetPackagedData

• `Const` **GetPackagedData**: [getPackagedData](_server_util_getpackageddata_.md#getpackageddata) = require('../../util/getpackageddata')

*Defined in [server/actions/runaction/index.js:1](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/actions/runaction/index.js#L1)*

___

### RunFunction

• `Const` **RunFunction**: [runFunction](_server_actions_runaction_runfunction_index_.md#runfunction) = require('./runfunction')

*Defined in [server/actions/runaction/index.js:2](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/actions/runaction/index.js#L2)*

## Functions

### runAction

▸ `Const`**runAction**(`db`: { all: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<any[]> ; get: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<{} \| undefined> ; insert: (table: string,row: {}) => Promise\<number> ; remove: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise ; run: (queries: string[]) => Promise ; update: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise  }, `action`: string, `func`: string, `node_id`: number, `user`: { role: [UserRole](_packages_fantastic_utils_types_d_.md#userrole) ; user_id: string \| number ; username: string  }, `date`: number, `options`: undefined \| { data?: undefined \| {} ; label?: undefined \| string ; test_id?: undefined \| number  }): Promise\<{ event_id: number ; result: { filter?: undefined \| false \| true ; results: { data?: undefined \| {} ; followups?: Object\<string, {}> ; label: string ; pass: boolean  }[]  }  }>

*Defined in [server/actions/runaction/index.js:18](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/actions/runaction/index.js#L18)*

Run a function from an action and record it in the database

#### Parameters:

Name | Type |
------ | ------ |
`db` | { all: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<any[]> ; get: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<{} \| undefined> ; insert: (table: string,row: {}) => Promise\<number> ; remove: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise ; run: (queries: string[]) => Promise ; update: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise  } |
`action` | string |
`func` | string |
`node_id` | number |
`user` | { role: [UserRole](_packages_fantastic_utils_types_d_.md#userrole) ; user_id: string \| number ; username: string  } |
`date` | number |
`options` | undefined \| { data?: undefined \| {} ; label?: undefined \| string ; test_id?: undefined \| number  } |

**Returns:** Promise\<{ event_id: number ; result: { filter?: undefined \| false \| true ; results: { data?: undefined \| {} ; followups?: Object\<string, {}> ; label: string ; pass: boolean  }[]  }  }>
