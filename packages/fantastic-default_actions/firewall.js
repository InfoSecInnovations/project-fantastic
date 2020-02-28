const InvokeCommandJSON = require('fantastic-cli/invokecommandjson')
const CimSession = require('fantastic-cli/cimsession')
const CimSessionJSON = require('fantastic-cli/cimsessionjson')

const action = {
  2 : 'Allow',
  4 : 'Block'
}

const direction = {
  1 : 'Inbound',
  2 : 'Outbound'
}

const firewall = {
  name: 'Check Windows Defender Firewall Status',
  description: "This command should show the three default profiles (there might be more though).",
  hosts: ['local', 'remote'],
  run: hostname => InvokeCommandJSON('get-netfirewallprofile | select name,enabled', hostname)
    .then(res => res.map(v => ({ // TODO fallback netsh command and parsing
      name: v.name,
      enabled: v.Enabled ? true : false
    })))
    .then(res => res.map(v => ({
      id: v.name,
      value: [
        {type: 'header', text: v.name},
        {
          type: 'button',
          text: 'Get Profile Rules',
          click: {
            function: 'get_rules',
            data: {profile: v.name}
          }
        },
        {
          type: 'button',
          text: v.enabled ? 'Enabled' : 'Disabled',
          click: {
            function: 'enable_profile',
            data: {profile: v.name, state: !v.enabled}
          },
          class: {disabled: !v.enabled}
        }
      ]
    }))),
  enable_profile: (hostname, data) => CimSession(`Set-NetFirewallProfile -Profile ${data.profile} -Enabled ${data.state}`, hostname).then(() => []),
  get_rules: (hostname, data) => CimSessionJSON(`Get-NetFirewallRule | where Profile -EQ ${data.profile}`, hostname)
    .then(res => res.map(v => ([
      {
        id: `${v.ID}header`,
        value: [{type: 'header', text: v.DisplayName}]
      },
      {
        id: v.ID,
        value: [
          `Direction: ${direction[v.Direction]}`,
          `Action: ${action[v.Action]}`,
          {
            type: 'button',
            text: v.Enabled ? 'Enabled' : 'Disabled',
            click: {
              function: 'enable_rule',
              data: {profile: data.profile, state: !v.Enabled, rule: v.ID}
            },
            class: {disabled: !v.Enabled}
          }
        ]
      }
    ])).flat()),
  enable_rule: (hostname, data) => Promise.resolve([{id: 'test', value:['This command will enable or disable firewall rules but for now it just demonstrates nesting']}])
}

module.exports = firewall