const NodeColumns = require('./nodecolumns')

const filterColumns = (row, overwrite) => NodeColumns.filter(v => overwrite || typeof v[row] !== 'undefined')

module.exports = filterColumns