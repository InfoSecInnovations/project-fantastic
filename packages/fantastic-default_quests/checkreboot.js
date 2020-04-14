const checkReboot = {
  name: 'Check Last Reboot',
  description: "Find systems which haven't been rebooted for over 30 days. These machines are likely to have outdated software as many programs require a restart to complete updates.",
  hosts: ['local', 'remote'],
  actions: [
    {
      path: 'fantastic-default_actions/lastBoot',
      search: {date: {date: '< Date.now() - 30 * 1000 * 60 * 60 * 24'}}
    }
  ],
  pass: {
    condition: false,
    success: 'All tested systems have been rebooted within the last 30 days.',
    failure: 'need to be rebooted.'
  }
}

module.exports = checkReboot