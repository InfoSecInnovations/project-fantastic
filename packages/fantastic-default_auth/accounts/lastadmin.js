const {get} = require('../db')

const lastAdmin = async username => {
  const user = await get({table: 'users', columns: ['username', 'role'], conditions: {columns: {username}}})
  if (!user) throw {not_exist: true}
  if (user.role !== 'admin') return user
  const row = await get({table: 'users', columns: ['user_id'], conditions: {groups:[{columns: {role: 'admin'}}, {columns: {username}, compare: '!='}]}})
  if (!row) throw {last_admin: true}
  return user
}

module.exports = lastAdmin