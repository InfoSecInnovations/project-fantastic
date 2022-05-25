const DB = require('../../db')

/**
 * Find hosts on our network we can remotely access using PowerShell
 * @param {number} local database ID of the host the server is running on 
 */
const getHosts = async () => await DB.all({table: 'nodes', conditions: {columns: {access: ['remote', 'local']}, compare: 'IN'}}).then(res => res.filter(node => node.access == 'local' || node.hostname))

module.exports = getHosts