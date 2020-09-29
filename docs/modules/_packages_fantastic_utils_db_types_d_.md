**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "packages/fantastic-utils/db/types.d"

# Module: "packages/fantastic-utils/db/types.d"

## Index

### Type aliases

* [DB](_packages_fantastic_utils_db_types_d_.md#db)
* [Operations](_packages_fantastic_utils_db_types_d_.md#operations)
* [Query](_packages_fantastic_utils_db_types_d_.md#query)
* [QueryCondition](_packages_fantastic_utils_db_types_d_.md#querycondition)

## Type aliases

### DB

Ƭ  **DB**: { transaction: (mode: number) => Promise\<[Operations](_packages_fantastic_utils_db_types_d_.md#operations)>  } & [Operations](_packages_fantastic_utils_db_types_d_.md#operations)

*Defined in [packages/fantastic-utils/db/types.d.ts:25](https://github.com/besimorhino/project-fantastic/blob/af5d0de/packages/fantastic-utils/db/types.d.ts#L25)*

___

### Operations

Ƭ  **Operations**: { all: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<any[]> ; get: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<{} \| undefined> ; insert: (table: string,row: {}) => Promise\<number> ; remove: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise ; run: (queries: string[]) => Promise ; update: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise  }

*Defined in [packages/fantastic-utils/db/types.d.ts:16](https://github.com/besimorhino/project-fantastic/blob/af5d0de/packages/fantastic-utils/db/types.d.ts#L16)*

#### Type declaration:

Name | Type |
------ | ------ |
`all` | (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<any[]> |
`get` | (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<{} \| undefined> |
`insert` | (table: string,row: {}) => Promise\<number> |
`remove` | (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise |
`run` | (queries: string[]) => Promise |
`update` | (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise |

___

### Query

Ƭ  **Query**: { columns: string[] ; conditions: [QueryCondition](_packages_fantastic_utils_db_types_d_.md#querycondition) \| { combine: \"AND\" \| \"OR\" ; groups: [QueryCondition](_packages_fantastic_utils_db_types_d_.md#querycondition)[]  } ; order_by: string \| string[] \| Object\<string, string> ; pagination: { page: number ; page_size: number  } ; row: Object\<string, any> ; table: string  }

*Defined in [packages/fantastic-utils/db/types.d.ts:7](https://github.com/besimorhino/project-fantastic/blob/af5d0de/packages/fantastic-utils/db/types.d.ts#L7)*

#### Type declaration:

Name | Type |
------ | ------ |
`columns` | string[] |
`conditions` | [QueryCondition](_packages_fantastic_utils_db_types_d_.md#querycondition) \| { combine: \"AND\" \| \"OR\" ; groups: [QueryCondition](_packages_fantastic_utils_db_types_d_.md#querycondition)[]  } |
`order\_by` | string \| string[] \| Object\<string, string> |
`pagination` | { page: number ; page_size: number  } |
`row` | Object\<string, any> |
`table` | string |

___

### QueryCondition

Ƭ  **QueryCondition**: { columns: Object\<string, any> \| [string, any][] ; combine?: \"AND\" \| \"OR\" ; compare?: \"=\" \| \"\<\" \| \"\<=\" \| \">\" \| \">=\" \| \"IN\"  }

*Defined in [packages/fantastic-utils/db/types.d.ts:1](https://github.com/besimorhino/project-fantastic/blob/af5d0de/packages/fantastic-utils/db/types.d.ts#L1)*

#### Type declaration:

Name | Type |
------ | ------ |
`columns` | Object\<string, any> \| [string, any][] |
`combine?` | \"AND\" \| \"OR\" |
`compare?` | \"=\" \| \"\<\" \| \"\<=\" \| \">\" \| \">=\" \| \"IN\" |
