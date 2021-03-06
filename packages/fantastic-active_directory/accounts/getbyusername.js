const {get} = require('../db')
const GetRole = require('./getrole')

/**
 * 
 * @param {string} username 
 * @returns {Promise<import('@infosecinnovations/fantastic-utils/types').User>}
 */
const getByUsername = async username => {
  const row = await get({table: 'users', columns: ['username', 'user_id'], conditions: {columns: {username}}})
  if (!row) return
  const role = await GetRole(row.username)
  return {...row, role}
}

module.exports = getByUsername