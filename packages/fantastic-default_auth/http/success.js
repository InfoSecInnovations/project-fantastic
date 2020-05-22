const success = (res, id, location) => {
  res.writeStatus('302 Found')
  res.writeHeader('Location', location || '/')
  res.writeHeader('Set-Cookie', `session_id=${id}; Secure; HttpOnly; Path=/;`)
  res.writeHeader('Set-Cookie', `error=;`)
  res.end()
}

module.exports = success