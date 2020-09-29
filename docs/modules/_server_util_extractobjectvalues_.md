**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "server/util/extractobjectvalues"

# Module: "server/util/extractobjectvalues"

## Index

### Variables

* [ExtractValue](_server_util_extractobjectvalues_.md#extractvalue)

### Functions

* [extractObjectValues](_server_util_extractobjectvalues_.md#extractobjectvalues)

## Variables

### ExtractValue

• `Const` **ExtractValue**: [extractValue](_server_util_extractvalue_.md#extractvalue) = require('./extractvalue')

*Defined in [server/util/extractobjectvalues.js:1](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/util/extractobjectvalues.js#L1)*

## Functions

### extractObjectValues

▸ `Const`**extractObjectValues**(`mapping`: {}, `raw_data`: string \| {}): object

*Defined in [server/util/extractobjectvalues.js:9](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/util/extractobjectvalues.js#L9)*

Grab values from raw data using the methods specified in the mapping object.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`mapping` | {} | The object containing the mapping data. |
`raw_data` | string \| {} | - |

**Returns:** object

An object with the same structure as the mapping object, but containing the values from the processing.
