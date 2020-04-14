const checkReboot = {
  name: 'Check Last Reboot',
  description: "Find systems which haven't been rebooted for over 30 days. These machines are likely to have outdated software as many programs require a restart to complete updates.",
  hosts: ['local', 'remote']
}

module.exports = checkReboot