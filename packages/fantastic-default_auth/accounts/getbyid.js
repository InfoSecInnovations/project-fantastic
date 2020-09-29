const {get} = require('../db')

/**
 * Get user data by database ID
 * @param {string | number} id
 * @returns {Promise<import('fantastic-utils/types').User>}
 */
const getByID = id => get({table: 'users', columns: ['username', 'role', 'user_id'], conditions: {columns: {user_id: id}}})

module.exports = getByID