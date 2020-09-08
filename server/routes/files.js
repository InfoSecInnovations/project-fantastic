const Serve = require('./serve')

const files = (res, req) => {
  const path = req.getUrl()
  const query = req.getQuery()
  res.onAborted(() => res.aborted = true)
  Serve(res, path, query)
}

module.exports = files