const NodeColumns = require('./nodecolumns')

const filterColumns = (row, overwrite) => NodeColumns.filter(v => overwrite || (typeof row[v] !== 'number' && typeof row[v] !== 'boolean' && !row[v]))

module.exports = filterColumns