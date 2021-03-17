# Scans

A scan is a wrapper around an action that allows you to run it on a selection of hosts and evaluate which ones meet a certain condition and which ones don't.

```
{
  "name": "Check Last Reboot",
  "description": "Find systems which haven't been rebooted for over $days days.",
  "hosts": ["local", "remote"],
  "parameters": [{"name": "days", "type": "number", "default": 30}],
  "actions": [
    {
      "path": "lastboot",  
      "search": [
        {
          "label": "Last Boot Up Time",
          "filter": {"date": "< Date.now() - 30 * 1000 * 60 * 60 * $days"}
        }
      ]
    }
  ],
  "pass": {
    "condition": false,
    "success": "All scanned systems have been rebooted within the last $days days.",
    "failure": "need to be rebooted."
  },
  "quest": {
    "explanation": "These machines are likely to have outdated software as many programs require a restart to complete updates.",
    "parameters": {"days": 30},
    "selection": {
      "age": {"h": 1}
    }
  }
}
```

See also [Common Fields](common_fields.md).

- `parameters` - an array of parameters which can be supplied to the scan including default values
- `actions` an array of Actions which will be run on the selected hosts :
  - `path` - path to the Action, can be preceded by the npm module path such as `@infosecinnovations/fantastic-default/lastboot` or just the name of the action if it is within the same module, as is the case here.
  - `search` - this is where we analyze the results to see if the host met the requirements or not:
    - `label` - how we label the result for the user.
    - `filter` - an object we compare against the Action's output. Each key matches a key from the action result data, and each value is a JavaScript expression we will run on it. The parameters can be used here using the $ symbol.
- `pass` - how we process the results:
  - if this the string `"review"` then the action results will be presented to the user, and they will have to manually review them. Expect this feature to become more advanced in the future.
  - `condition` - boolean. If this is false we require the JavaScript expression from the filter to return false for the host to pass, if not it must be true.
  - `success` - text template if all the hosts passed.
  - `failure` - text template to describe any hosts that didn't pass. Will be prefixed with "X systems" where X is the number that failed.
- `quest` - *Optional* if this field is present this scan will also be elegible to be picked as one of the Daily Quests.
  - `explanation` - you can add some more details here about why the user should run this scan.
  - `parameters` - instead of user input parameters, Quests use a fixed set you should specify here.
  - `selection` - Quests select hosts from the network using these criteria, unlike the base Scan which operates on the hosts currently being viewed by the user:
    - `age` - currently the only supported parameter, has keys `d`, `h`, `m` to specify days, hours and minutes respectively. This refers to the time the host was last seen on the network. If you put something too long ago the quest may take a very long time to run, but if you put something too recent you may miss interesting results.