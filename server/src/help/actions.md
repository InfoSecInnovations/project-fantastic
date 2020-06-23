# Actions

Actions allow you to interact with hosts on the network, they can simply provide you with information, or allow you to modify the host.

To create your own actions, make an npm package which returns an object indicating the filenames of each action. Your `index.js` could look like this:

```
{
  action1: 'action1.json',
  action2: 'action2.json
}
```

Each action is a json file with the following fields:

## name

*Optional*

This is the name displayed in the interface. If no name is provided it will default to the key in the package object.

## description

*Optional*

This description should inform the user about the command.

## hosts

The access levels required to run this command on a host. This is an array.

- `local` : this command can run on the server machine
- `remote` : this command can run on any machine with PowerShell remote access from the server.
- `none` : this command can target any machine on the network (not supported yet)

## functions

Data about the commands and parsing the results of said commands.

There must always be a `run` function, this is the entrypoint for the action. The other functions can be called as followups to this one.

- `command` : the PowerShell command used to perform the action. If this is a followup function PowerShell variables will be created from the data that was passed into it.

  data:

  ```
  {
    "variable1": "foo",
    "variable2": "bar"
  }
  ```

  command:

  ```
  PowerShell-Command -Parameter1 $variable1 -Parameter2 $variable2
  ```

- `method` : possible values are `invoke` and `cimsession`. `invoke` will wrap the command in a script block and invoke it on the host, `cimsession` should be used on commands which support the `-CimSession` parameter.
- `json` : *Optional.* if true, `ConvertTo-Json` will be appended to the command and the output will be parsed as a JSON object instead of a string. Parsing of non-JSON output isn't well supported at the moment, so this should be enabled if the action returns a result. 
- `result` : *Optional* how the output of the command will be processed into a result object. See below. If this isn't specified, the command will simply be run on the host, and nothing will be returned.

### Output parsing

The `result` object specifies how certain fields should be mapped from the JSON object returned by the command to the output required by the application. The following values and fields are supported:

- string: if the value is a string, we just get the value corresponding to that key, for example: `"name"` will return the `name` field of the command output.
- bool: if the value is an object with the key `bool` the corresponding value in the result object will be true if the specified field in the output is truthy. For example: `{"bool": "Enabled"}` will return true if the `Enabled` field of the command output has a truthy value (true, non-null, non-zero etc). If the object also has `"inverse": true` the value of the boolean will be inverted.
- map: if the value is an object with the key `map` the output field specified in `key` will be used as an indexer for the `map` object. 

  For example:
  ```
  {
    "map": {"1": "Inbound", "2": "Outbound"},
    "key": "Direction"
  }
  ```
  will take the `Direction` field from the command output and return `"Inbound"` if the value is `1` and `"Outbound"` if the value is `2`.
- static: returns a static value. `{"static": "Example"}` will always return `"Example"` regardless of the command output.
- labelled: prefix the output with the key. For example `{"labelled": "Version"}` will return `"Version: 2"` if the value of `Version` is `2`. If used in conjunction with the `map` field it will label the result with the key specified in `key`.
- combine: combine the results of parsing each item of the `combine` array into one string.
- date: convert the field with this name from PowerShell `Date(int)` format to `{date: number}` (which the client will display as a formatted date string).
- key_value_string: parses a string in `"key1=value1,key2=value2"` format and returns the value corresponding to the specified key. For example: `{"key_value_string": "Name"}` returns `"sebovzeoueb"` for the string `Domain="DESKTOP-PBNIV5R",Name="sebovzeoueb"`.