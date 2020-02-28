const CimSessionJSON = require('fantastic-cli/cimsessionjson')

const getMpComputerStatus = {
  name: 'Check Windows Defender Status',
  hosts: ['local', 'remote'],
  run: hostname => CimSessionJSON('Get-MpComputerStatus', hostname)
    .then(res => ([ // there should only be one JSON object from this command
      {
        id: 'antivirus',
        value: [
          'Antivirus',
          res[0].AntivirusEnabled ? 'Enabled' : 'Disabled'
        ]
      },
      {
        id: 'antispyware',
        value: [
          'Antispyware',
          res[0].AntispywareEnabled ? 'Enabled' : 'Disabled'
        ]
      }
    ]))
}

module.exports = getMpComputerStatus