const CimSessionJSON = require('fantastic-cli/cimsessionjson')

const getMpComputerStatus = {
  name: 'Check Windows Defender Status',
  description: 'This command pulls back basic Windows Defender status.',
  hosts: ['local', 'remote'],
  run: hostname => CimSessionJSON('Get-MpComputerStatus', hostname)
    .then(res => ([ // there should only be one JSON object from this command
      [
        'Antivirus',
        res[0].AntivirusEnabled ? 'Enabled' : 'Disabled'
      ],
      [
        'Antispyware',
        res[0].AntispywareEnabled ? 'Enabled' : 'Disabled'
      ]
    ]))
}

module.exports = getMpComputerStatus