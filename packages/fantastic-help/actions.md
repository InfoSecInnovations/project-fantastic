# Actions

Actions allow you to interact with hosts on the network, they can simply provide you with information, or allow you to modify the host.

Each action is a json file something like this:

```
{
  "name": "Check Windows Defender Firewall Status",
  "description": "This command should show the three default profiles (there might be more though).",
  "hosts": ["local", "remote"],
  "functions": {
    "run": {
      "command": "Get-NetFirewallProfile | select name, enabled",
      "method": "invoke",
      "json": true,
      "result": {
        "label": "name",
        "followups": [
          {
            "function": "enable_profile",
            "data": {
              "profile": "name",
              "state": {"bool": "Enabled", "inverse": true}
            },
            "enabled": {"bool": "Enabled"}
          },
          {
            "function": "get_rules",
            "data": {
              "profile": "name"
            }
          }
        ]
      },
      "static": [
        {
          "label": "Any",
          "followups": [
            {
              "function": "get_rules",
              "data": {
                "profile": "Any"
              }
            }
          ]
        }
      ]
    },
    "enable_profile": {
      "name": "Enable Profile",
      "command": "Set-NetFirewallProfile -Profile $profile -Enabled $state",
      "role": "elevated",
      "method": "cimsession"
    },
    "get_rules": {
      "name": "Get Profile Rules",
      "command": "Get-NetFirewallRule | where Profile -EQ $profile",
      "method": "cimsession",
      "json": true,
      "result": {
        "label": "DisplayName",
        "data": [
          {
            "map": {"1": "Inbound", "2": "Outbound"},
            "key": "Direction",
            "labelled": true
          },
          {
            "map": {"2": "Allow", "4": "Block"},
            "key": "Action",
            "labelled": true
          }
        ],
        "followups": [
          {
            "function": "enable_rule",
            "data": {
              "profile": "Profile",
              "state": {"bool": "Enabled", "inverse": true},
              "rule": "ID"
            },
            "enabled": {"bool": "Enabled"} 
          }
        ]
      }
    },
    "enable_rule": {
      "name": "Enable Rule",
      "command": "",
      "role": "elevated"
    }
  }
}
```

here's a breakdown of what the fields mean:

## name

*Optional*

This is the name displayed in the interface. If no name is provided it will default to the key in the package object.

## description

*Optional*

This description should inform the user about the command.

## role

*Optional*

Values can be `elevated` or `admin`, if no role is specified the action will be available to all users. This can be overridden by individual functions.

## hosts

The access levels required to run this command on a host. This is an array.

- `local` : this command can run on the server machine
- `remote` : this command can run on any machine with PowerShell remote access from the server.
- `none` : this command can target any machine on the network (not supported yet)

## target (WIP)

*Optional*

What entities this action targets.

- `host` default value
- `connection` this action targets a TCP connection between 2 hosts, it will receive the following parameters by default:
  - `local_ip`
  - `local_port`
  - `remote_ip`
  - `remote_port`
  - `process` PID of the process owning the connection

## functions

Data about the commands and parsing the results of said commands.

There must always be a `run` function, this is the entrypoint for the action. The other functions can be called as followups to this one.

- `name` : the display name for this function, only applies to followup functions. This will be used on buttons to run this function that don't specify another labelling method.
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
- `role` : see role section above. Overrides the action's role requirement for this function.
- `method` : possible values are `invoke` and `cimsession`. `invoke` will wrap the command in a script block and invoke it on the host, `cimsession` should be used on commands which support the `-CimSession` parameter.
- `json` : *Optional.* if true, `ConvertTo-Json` will be appended to the command and the output will be parsed as a JSON object instead of a string. Parsing of non-JSON output isn't well supported at the moment, so this should be enabled if the action returns a result. 
- `result` : *Optional* how the output of the command will be processed into a result object. See below. If this isn't specified, the command will simply be run on the host, and nothing will be returned.
- `static` : *Optional* a result object that will always be displayed along with the other results. In the above example this is used to display followup actions relating to the "Any" Firewall profile, which isn't a "real" profile, but is used by a lot of rules.

### Output mapping

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

### Object structure

- `label` : uses output mapping to get the value, this will show up as the title of the action results in the client.
- `data` : an array of text fields displayed below the label. The items use output mapping.
- `followups` : an array of functions which can be called as a result of running this one. These will display as buttons if the user has the necessary permissions to run them, or plain text if not. Each followup has the following fields:
  - `function` : the function from this action that will run when clicking the button.
  - `data` : the parameters which will be used by the followup's command (see the `command` field example above). These use output mapping to populate the values.
  - `enabled` : The text on the button will read "Enabled" if the parsed value is true, and "Disabled" if not, and the button uses a special class to visually show this state.
  - `label` : Use output mapping to generate the text displayed on the button.