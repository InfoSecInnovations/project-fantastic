const clone = obj => {
  if (typeof obj != 'object' || !obj) return obj
  if (Array.isArray(obj)) return [...obj.map(clone)]
  return Object.entries(obj).reduce((result, e) => ({...result, [e[0]]: clone(e[1])}), {})
}

module.exports = clone