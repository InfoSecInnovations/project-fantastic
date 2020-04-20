const checkReboot = {
  name: 'Check Last Reboot',
  parameters: {days: 30},
  test: 'fantastic-default_tests/checkReboot',
  description: "These machines are likely to have outdated software as many programs require a restart to complete updates."
}

module.exports = checkReboot