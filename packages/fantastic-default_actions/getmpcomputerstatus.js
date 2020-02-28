const CimSessionJSON = require('fantastic-cli/cimsessionjson')

const getMpComputerStatus = {
  name: 'Check Windows Defender Status',
  hosts: ['local', 'remote'],
  run: hostname => CimSessionJSON('Get-MpComputerStatus', hostname)
    .then(res => ([ // there should only be one JSON object from this command
      {
        id: 'antivirus',
        value: [
          {type: 'header', text: 'Antivirus'},
          {
            type: 'button',
            text: res[0].AntivirusEnabled ? 'Enabled' : 'Disabled',
            click: {
              function: 'enable_antivirus',
              data: {state: !res[0].AntivirusEnabled}
            }
          }      
        ]
      },
      {
        id: 'antispyware',
        value: [
          {type: 'header', text: 'Antispyware'},
          {
            type: 'button',
            text: res[0].AntispywareEnabled ? 'Enabled' : 'Disabled',
            click: {
              function: 'enable_antispyware',
              data: {state: !res[0].AntispywareEnabled}
            }
          }
        ]
      }
    ])),
  enable_antivirus: (hostname, data) => Promise.resolve([{id: 'antivirus', value: ['TODO: set Antivirus state']}]),
  enable_antispyware: (hostname, data) => Promise.resolve([{id: 'antispyware', value: ['TODO: set Antispyware state']}])
}

module.exports = getMpComputerStatus