const {get} = require('../db')
const GetRole = require('./getrole')

/**
 * Get user by database ID
 * @param {number | string} id 
 * @returns {Promise<import('@infosecinnovations/fantastic-utils/types').User>}
 */
const getByID = async id => {
  const row = await get({table: 'users', columns: ['username', 'user_id'], conditions: {columns: {user_id: id}}})
  if (!row) return
  const role = await GetRole(row.username)
  return {...row, role}
}


module.exports = getByID