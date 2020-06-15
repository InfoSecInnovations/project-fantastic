const GetPackage = require('../util/getpackage')
const {get} = require('../db')

const getCommandData = async config => {
  if (!config.host_data_commands) return {}
  return await Promise.all(
    Object.entries(config.host_data_commands).map(v => 
      GetPackage(v[0])
      .then(async res => {
        const result = []
        for (const k of Object.keys(res)) {
          const command = `${v[0]}/${k}`
          let mode
          if (v[1].force && v[1].force.includes(k)) mode = 'force'
          else mode = await get({table: 'command_history', columns: ['status'], conditions: {columns: {command}}, order_by: {date: 'DESC'}})
          .then(res => {
            if (typeof res === 'undefined') return v[1].default_enabled.includes(k) ? 'enabled' : 'disabled'
            return res.status ? 'enabled' : 'disabled'
          })
          result.push({[command]: mode})
        }
        return result
      })
    )
  )
  .then(res => 
    res.flat()
    .reduce((result, v) => ({...result, ...v}), {})
  )
}

module.exports = getCommandData