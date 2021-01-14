/**
 * Get the default set of parameters from test data
 * @param {{}} data 
 */
const defaultParameters = data => (data.parameters && data.parameters.reduce((result, p) => ({...result, [p.name]: p.default}), {})) || {}

module.exports = defaultParameters