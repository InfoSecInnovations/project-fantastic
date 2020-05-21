const NodeColumns = require('./nodecolumns')

const filterColumns = (row, overwrite) => NodeColumns.filter(v => overwrite || typeof row[v] !== 'undefined')

module.exports = filterColumns