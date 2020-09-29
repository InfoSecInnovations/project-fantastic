**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "server/util/getabsolutedatapath"

# Module: "server/util/getabsolutedatapath"

## Index

### Functions

* [getAbsoluteDataPath](_server_util_getabsolutedatapath_.md#getabsolutedatapath)

## Functions

### getAbsoluteDataPath

▸ `Const`**getAbsoluteDataPath**(`path`: string, `parent_path`: string): string

*Defined in [server/util/getabsolutedatapath.js:6](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/util/getabsolutedatapath.js#L6)*

If we're loading data relative to another module, join the parent path if needed

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`path` | string | path we're trying to load |
`parent_path` | string | path of the module this path should be relative to  |

**Returns:** string
