const Serve = require('./serve')
const Abort = require('./abort')

const files = (res, req) => {
  Abort(res)
  const path = req.getUrl()
  const query = req.getQuery()
  Serve(res, path, query)
}

module.exports = files