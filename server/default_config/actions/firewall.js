const InvokeCommandJSON = require('fantastic-cli/invokecommandjson')
const CimSession = require('fantastic-cli/cimsession')

const firewall = {
  name: 'Check Windows Defender Firewall Status',
  description: "This command should show the three default profiles (there might be more though). You will get the profile name and 'enabled' or 'disabled' as results.",
  hosts: ['local', 'remote'],
  run: hostname => InvokeCommandJSON('get-netfirewallprofile | select name,enabled', hostname)
    .then(res => res.map(v => ({ // TODO fallback netsh command and parsing
      name: v.name,
      enabled: v.Enabled ? true : false
    })))
    .then(res => res.map(v => [
      v.name,
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
    ])),
  enable_profile: (hostname, data) => CimSession(`Set-NetFirewallProfile -Profile ${data.profile} -Enabled ${data.state}`, hostname).then(() => [])
}

module.exports = firewall