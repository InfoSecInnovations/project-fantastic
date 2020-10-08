const GetPackageScripts = require('../util/getpackagescripts')
const {get} = require('../db')

/**
 * 
 * @param {{}} config 
 * @returns {Promise<Object.<string, 'enabled' | 'disabled' | 'force'>>} keys are command name, values are the command's status
 */
const getCommandData = async config => {
  return await Promise.all(
    config.assets.packages.map(v => GetPackageScripts(v, 'commands')
      .then(async res => {
        const result = []
        for (const k of res) {
          const command = `${v}/${k}`
          let mode
          if (config.assets.force_commands.includes(command)) mode = 'force'
          else mode = await get({table: 'command_history', columns: ['status'], conditions: {columns: {command}}, order_by: {date: 'DESC'}})
          .then(res => {
            if (typeof res === 'undefined') return config.assets.default_enable_commands.includes(command) ? 'enabled' : 'disabled'
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