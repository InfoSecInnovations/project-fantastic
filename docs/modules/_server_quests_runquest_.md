**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "server/quests/runquest"

# Module: "server/quests/runquest"

## Index

### Variables

* [ConvertTime](_server_quests_runquest_.md#converttime)
* [GetPackagedData](_server_quests_runquest_.md#getpackageddata)
* [RunTest](_server_quests_runquest_.md#runtest)
* [getNodes](_server_quests_runquest_.md#getnodes)

### Functions

* [runQuest](_server_quests_runquest_.md#runquest)

## Variables

### ConvertTime

• `Const` **ConvertTime**: [convertTime](_packages_fantastic_utils_converttime_.md#converttime) = require('fantastic-utils/converttime')

*Defined in [server/quests/runquest.js:4](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/quests/runquest.js#L4)*

___

### GetPackagedData

• `Const` **GetPackagedData**: [getPackagedData](_server_util_getpackageddata_.md#getpackageddata) = require('../util/getpackageddata')

*Defined in [server/quests/runquest.js:1](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/quests/runquest.js#L1)*

___

### RunTest

• `Const` **RunTest**: [runTest](_server_tests_runtest_.md#runtest) = require('../tests/runtest')

*Defined in [server/quests/runquest.js:2](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/quests/runquest.js#L2)*

___

### getNodes

•  **getNodes**: [getNodes](_server_db_getnodes_index_.md#getnodes)

*Defined in [server/quests/runquest.js:3](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/quests/runquest.js#L3)*

## Functions

### runQuest

▸ `Const`**runQuest**(`db`: { all: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<any[]> ; get: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<{} \| undefined> ; insert: (table: string,row: {}) => Promise\<number> ; remove: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise ; run: (queries: string[]) => Promise ; update: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise  }, `quest`: string, `user`: { role: [UserRole](_packages_fantastic_utils_types_d_.md#userrole) ; user_id: string \| number ; username: string  }, `date`: number): Promise\<{ event_id: number ; results: ({ action: string = action\_path; filter: undefined \| false \| true = result.filter; node_id: any = row.node\_id; result: { data?: undefined \| {} ; followups?: Object\<string, {}> ; label: string ; pass: boolean  }[] = result.results } \| { action: string = action\_path; node_id: any = row.node\_id; result: boolean = CheckResult(result.results, action.search, parameters) })[] ; rows: { access: [HostAccess](_server_db_types_d_.md#hostaccess) ; hostname?: undefined \| string ; important: boolean ; ips?: string[] ; macs?: Array\<{ mac: string ; vendor: string  }> ; os?: undefined \| string  } & { connections: [] ; node_id: number  }[]  }>

*Defined in [server/quests/runquest.js:13](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/quests/runquest.js#L13)*

Run a quest

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`db` | { all: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<any[]> ; get: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<{} \| undefined> ; insert: (table: string,row: {}) => Promise\<number> ; remove: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise ; run: (queries: string[]) => Promise ; update: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise  } |  |
`quest` | string |  |
`user` | { role: [UserRole](_packages_fantastic_utils_types_d_.md#userrole) ; user_id: string \| number ; username: string  } |  |
`date` | number |   |

**Returns:** Promise\<{ event_id: number ; results: ({ action: string = action\_path; filter: undefined \| false \| true = result.filter; node_id: any = row.node\_id; result: { data?: undefined \| {} ; followups?: Object\<string, {}> ; label: string ; pass: boolean  }[] = result.results } \| { action: string = action\_path; node_id: any = row.node\_id; result: boolean = CheckResult(result.results, action.search, parameters) })[] ; rows: { access: [HostAccess](_server_db_types_d_.md#hostaccess) ; hostname?: undefined \| string ; important: boolean ; ips?: string[] ; macs?: Array\<{ mac: string ; vendor: string  }> ; os?: undefined \| string  } & { connections: [] ; node_id: number  }[]  }>
