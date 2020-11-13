const {get} = require('../db')

/**
 * Get user by session ID
 * @param {string} session_id 
 * @returns {Promise<import('@infosecinnovations/fantastic-utils/types').User>}
 */
const verify = session_id => session_id ? get({table: 'users', columns: ['user_id', 'role', 'username'], conditions: {columns: {session_id}}}) : Promise.resolve()

module.exports = verify