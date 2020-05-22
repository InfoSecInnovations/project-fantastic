const getCookie = (header, key) => {
  const index = header.indexOf(key)
  if (index < 0) return
  const start_index = index + key.length + 1
  const end_index = header.indexOf(';', start_index)
  return header.slice(start_index, end_index > 0 ? end_index : undefined)
}

module.exports = getCookie