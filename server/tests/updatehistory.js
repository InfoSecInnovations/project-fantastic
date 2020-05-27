const {insert} = require('../db')

const updateHistory = (test, user_id, date, results, parameters) => insert('test_history', {test, date, results: JSON.stringify(results), parameters: JSON.stringify(parameters), user_id})

module.exports = updateHistory