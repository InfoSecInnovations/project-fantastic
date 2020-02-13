const processJson = res => {
  if (!res) return []
  const obj = JSON.parse(res)
  return Array.isArray(obj) ? obj : [obj]
}

module.exports = processJson