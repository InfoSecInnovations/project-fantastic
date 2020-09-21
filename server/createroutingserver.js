const HTTPolyglot = require('httpolyglot')
const Path = require('path')
const FS = require('fs')

const createRoutingServer = (config, cert_directory) => HTTPolyglot.createServer({
  key: FS.readFileSync(Path.join(cert_directory, 'key')),
  cert: FS.readFileSync(Path.join(cert_directory, 'cert'))
}, function(req, res) {
  res.writeHead(301, { 'Location': `https://${req.headers.host.split(':')[0]}:${config.port + 1}` })
  return res.end()
}).listen(config.port)

module.exports = createRoutingServer