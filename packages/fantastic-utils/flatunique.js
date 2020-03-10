const flatUnique = arr => [...new Set(arr.flat().filter(v => typeof v !== 'undefined'))]

module.exports = flatUnique