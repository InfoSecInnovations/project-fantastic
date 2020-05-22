const NodeColumns = require('./nodecolumns')

/**
 * 
 * @param {Object} row the row being overwritten
 * @param {boolean} overwrite should we overwrite existing data in the row?
 */
const filterColumns = (row, overwrite) => NodeColumns.filter(v => overwrite || (typeof row[v] === 'undefined' || row[v] === null))

module.exports = filterColumns