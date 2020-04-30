const success = (res, id) => {
  res.writeStatus('302 Found')
  res.writeHeader('Location', '/')
  res.writeHeader('Set-Cookie', `session_id=${id}; Secure: HttpOnly; Path=/;`)
  res.end()
}

module.exports = success