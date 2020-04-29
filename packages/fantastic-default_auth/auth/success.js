const success = (res, id) => {
  res.writeStatus('302 Found')
  res.writeHeader('Set-Cookie', `session_id=${id}`)
  res.writeHeader('Location', '../')
  res.end()
}

module.exports = success