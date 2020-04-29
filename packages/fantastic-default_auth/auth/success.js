const success = res => {
  res.writeStatus('302 Found')
  res.writeHeader('Location', '../')
  res.end()
}

module.exports = success