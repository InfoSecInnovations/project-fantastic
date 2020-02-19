const FS = require('fs').promises

const files = (res, req) => {
  res.onAborted()
  let path = req.getUrl()
  if (!path || path === '/') path = '/index.html'
  if (path.endsWith('.svg')) res.writeHeader('Content-Type', 'image/svg+xml')
  FS.readFile(`src${path}`).then(file => res.end(file), rej => res.end(''))
}

module.exports = files