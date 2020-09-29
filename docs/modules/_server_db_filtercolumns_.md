**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "server/db/filtercolumns"

# Module: "server/db/filtercolumns"

## Index

### Variables

* [NodeColumns](_server_db_filtercolumns_.md#nodecolumns)

### Functions

* [filterColumns](_server_db_filtercolumns_.md#filtercolumns)

## Variables

### NodeColumns

• `Const` **NodeColumns**: string[] = require('./nodecolumns')

*Defined in [server/db/filtercolumns.js:1](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/db/filtercolumns.js#L1)*

## Functions

### filterColumns

▸ `Const`**filterColumns**(`row`: {}, `overwrite`: boolean): string[]

*Defined in [server/db/filtercolumns.js:8](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/db/filtercolumns.js#L8)*

Select only columns which are empty unless we're overwriting

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`row` | {} | the row being overwritten |
`overwrite` | boolean | should we overwrite existing data in the row?  |

**Returns:** string[]
