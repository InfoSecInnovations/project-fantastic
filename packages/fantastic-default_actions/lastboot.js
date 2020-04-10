const InvokeCommandJSON = require('fantastic-cli/invokecommandjson')

const lastBoot = {
  name: 'Get Last Boot Time',
  description: 'Find out when this computer was last booted',
  hosts: ['local', 'remote'],
  run: hostname => 
    InvokeCommandJSON('Get-CimInstance -ClassName win32_operatingsystem | select lastbootuptime', hostname)
    .then(res => {
      const start_index = res[0].lastbootuptime.indexOf('(') + 1
      const end_index = res[0].lastbootuptime.indexOf(')')
      const date = res[0].lastbootuptime.slice(start_index, end_index)
      return [
        {
          id: 'date',
          value: [{type: 'date', date: parseInt(date)}]
        }
      ]
    })
}

module.exports = lastBoot