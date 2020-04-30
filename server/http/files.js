const Serve = require('./serve')

const files = (res, req) => {
  const path = req.getUrl()
  res.onAborted(() => res.aborted = true)
  Serve(res, path)
}

module.exports = files