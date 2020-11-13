const {get} = require('../db')

/**
 * 
 * @param {string} username 
 * @returns {Promise<import('@infosecinnovations/fantastic-utils/types').User>}
 */
const getByUsername = username => get({table: 'users', columns: ['username', 'role', 'user_id'], conditions: {columns: {username}}})

module.exports = getByUsername