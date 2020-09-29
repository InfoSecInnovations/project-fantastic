**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "server/routes/serve"

# Module: "server/routes/serve"

## Index

### Variables

* [FS](_server_routes_serve_.md#fs)
* [MarkdownIt](_server_routes_serve_.md#markdownit)
* [SVGSon](_server_routes_serve_.md#svgson)
* [md](_server_routes_serve_.md#md)

### Functions

* [getTitle](_server_routes_serve_.md#gettitle)
* [insert](_server_routes_serve_.md#insert)
* [markdown](_server_routes_serve_.md#markdown)
* [serve](_server_routes_serve_.md#serve)
* [svg](_server_routes_serve_.md#svg)

## Variables

### FS

• `Const` **FS**: "fs/promises" = require('fs').promises

*Defined in [server/routes/serve.js:1](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/routes/serve.js#L1)*

___

### MarkdownIt

• `Const` **MarkdownIt**: any = require('markdown-it')

*Defined in [server/routes/serve.js:2](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/routes/serve.js#L2)*

___

### SVGSon

• `Const` **SVGSon**: "svgson" = require('svgson')

*Defined in [server/routes/serve.js:3](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/routes/serve.js#L3)*

___

### md

• `Const` **md**: any = new MarkdownIt({ html: true })

*Defined in [server/routes/serve.js:5](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/routes/serve.js#L5)*

## Functions

### getTitle

▸ `Const`**getTitle**(`body`: any): any

*Defined in [server/routes/serve.js:11](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/routes/serve.js#L11)*

#### Parameters:

Name | Type |
------ | ------ |
`body` | any |

**Returns:** any

___

### insert

▸ `Const`**insert**(`body`: any, `index`: any, `s`: any): string

*Defined in [server/routes/serve.js:9](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/routes/serve.js#L9)*

#### Parameters:

Name | Type |
------ | ------ |
`body` | any |
`index` | any |
`s` | any |

**Returns:** string

___

### markdown

▸ `Const`**markdown**(`file`: any): Promise\<Buffer>

*Defined in [server/routes/serve.js:18](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/routes/serve.js#L18)*

#### Parameters:

Name | Type |
------ | ------ |
`file` | any |

**Returns:** Promise\<Buffer>

___

### serve

▸ `Const`**serve**(`res`: any, `path`: any, `query`: any): void

*Defined in [server/routes/serve.js:38](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/routes/serve.js#L38)*

#### Parameters:

Name | Type |
------ | ------ |
`res` | any |
`path` | any |
`query` | any |

**Returns:** void

___

### svg

▸ `Const`**svg**(`file`: any, `query`: any): Promise\<string>

*Defined in [server/routes/serve.js:30](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/routes/serve.js#L30)*

#### Parameters:

Name | Type |
------ | ------ |
`file` | any |
`query` | any |

**Returns:** Promise\<string>
