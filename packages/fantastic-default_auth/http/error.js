const error = (res, error, location) => {
  res.writeStatus('302 Found')
  res.writeHeader('Location', location || '/auth')
  res.writeHeader('Set-Cookie', `error=${error};`)
  res.end()
}

module.exports = error