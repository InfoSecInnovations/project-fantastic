# PowerShell Commands

Some data items use PowerShell commands to gather data and execute actions. Here are the fields

- `command` - the PowerShell command used to perform the task. If data is going to be passed in from somewhere else you can use PowerShell variables like this:

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
- `method` - possible values are `invoke` and `cimsession`. `invoke` will wrap the command in a script block and invoke it on the host, `cimsession` should be used on commands which support the `-CimSession` parameter.
- `json` - *Optional.* if true, `ConvertTo-Json` will be appended to the command and the output will be parsed as a JSON object instead of a string. Most of the time we use this as there aren't many options for dealing with text output. 
- `result` - *Optional* how the output of the command will be processed into a result object. See below. If this isn't specified, the command will simply be run on the host, and nothing will be returned.
- `static` - *Optional* a result object that will always be displayed along with the other results. For example this is used to display followup actions relating to the "Any" Firewall profile, which isn't a "real" profile, but is used by a lot of rules.

## Output mapping

### JSON

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
- combine: combine the results of processing each item of the `combine` array into one string.
- date: convert the field with this name from PowerShell `Date(int)` format to `{date: number}` (which the client will display as a formatted date string).
- key_value_string: parses a string in `"key1=value1,key2=value2"` format and returns the value corresponding to the specified key. For example: `{"key_value_string": "Name"}` returns `"sebovzeoueb"` for the string `Domain="DESKTOP-PBNIV5R",Name="sebovzeoueb"`.

### XML

*TODO: explain how to get result data from XML files written by a command*

See the nmap command for an example on how to parse data from an XML file, but hopefully you won't have to do this as most commands can be made to output JSON!