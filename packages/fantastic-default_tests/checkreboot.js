const checkReboot = {
  name: 'Check Last Reboot',
  description: "Find systems which haven't been rebooted for over $days days.",
  hosts: ['local', 'remote'],
  parameters: [{name: 'days', type: 'number', default: 30}],
  actions: [
    {
      path: 'fantastic-default_actions/lastBoot',  
      search: {"Last Boot Up Time": {date: '< Date.now() - 30 * 1000 * 60 * 60 * $days'}}
    }
  ],
  pass: {
    condition: false,
    success: 'All tested systems have been rebooted within the last $days days.',
    failure: 'need to be rebooted.'
  }
}

module.exports = checkReboot