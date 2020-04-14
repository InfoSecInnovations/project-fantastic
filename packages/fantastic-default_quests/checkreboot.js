const checkReboot = {
  name: 'Check Last Reboot',
  description: "Find systems which haven't been rebooted for over 30 days. These machines are likely to have outdated software as many programs require a restart to complete updates.",
  hosts: ['local', 'remote'],
  actions: [
    {
      path: 'fantastic-default_actions/lastBoot',
      search: {date: {date: '< Date.now() - 30 * 1000 * 60'}} // TODO: *60 *24 to make it days instead of minutes
    }
  ]
}

module.exports = checkReboot