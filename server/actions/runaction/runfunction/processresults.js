/**
 * 
 * @param {import('./result').Result[] } results 
 */
const processResults = results => {
  results = results.flat()
  for (let i = 0; i < results.length;) {
    if (typeof results[i].label === 'undefined' || results.find((v, j) => j !== i && v.label === results[i].label)) results.splice(i, 1)
    else i++
  }
  return results
}

module.exports = processResults