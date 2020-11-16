const HTTPolyglot = require('httpolyglot')
const Path = require('path')
const FS = require('fs')

/**
 * Create a server that redirects http and https traffic on a port to https on that port +1
 * @param {number} port 
 * @param {string} cert_directory 
 */
const createRoutingServer = (port, cert_directory) => HTTPolyglot.createServer({
  key: FS.readFileSync(Path.join(cert_directory, 'key')),
  cert: FS.readFileSync(Path.join(cert_directory, 'cert'))
}, function(req, res) {
  res.writeHead(301, { 'Location': `https://${req.headers.host.split(':')[0]}:${port + 1}` })
  return res.end()
}).listen(port)

module.exports = createRoutingServer