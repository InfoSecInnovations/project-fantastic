const processJson = res => {
  if (!res) return []
  try {
    const obj = JSON.parse(res)
    return Array.isArray(obj) ? obj : [obj]
  }
  catch (err) {
    console.log(`Unable to parse JSON from "${res}"`)
    return []
  }
}

module.exports = processJson