# Actions

Actions allow you to interact with hosts on the network, they can simply provide you with information, or allow you to modify the host.

They are based around a PowerShell command with optional followup actions using the data from the first command.

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

This may seem intimidating, but it's not actually that difficult once you've figured out how we map data from the command output to Fantastic's action output.

Here's a breakdown of what the fields mean:

See also: 

- [Common Fields](common_fields.md) note that the role field can be overridden by individual functions.
- [PowerShell Commands](powershell_commands.md) for the function commands and data mappings.

## target

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

- `name` : the display name for this function, only applies to followup functions. This will be used on buttons to run this function that don't specify another labelling method, as well as followup actions used by scans.

### Object structure

- `label` : uses output mapping to get the value, this will show up as the title of the action results in the client.
- `data` : an array of text fields displayed below the label. The items use output mapping.
- `followups` : an array of functions which can be called as a result of running this one. These will display as buttons if the user has the necessary permissions to run them, or plain text if not. Each followup has the following fields:
  - `function` : the function from this action that will run when clicking the button.
  - `data` : the parameters which will be used by the followup's command (see the `command` field example above). These use output mapping to populate the values.
  - `enabled` : The text on the button will read "Enabled" if the parsed value is true, and "Disabled" if not, and the button uses a special class to visually show this state.
  - `label` : Use output mapping to generate the text displayed on the button.