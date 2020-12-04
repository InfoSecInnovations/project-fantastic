export default obj => Object.entries(obj)
  .filter(v => typeof v[1] != 'undefined')
  .map(v => {
    const value = Array.isArray(v[1]) ? `[${v[1]}]` : v[1]
    return `${v[0]}=${value}`
  })
  .join('&')