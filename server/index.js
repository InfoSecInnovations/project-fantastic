const UWS = require('uWebSockets.js')
const FS = require('fs').promises
const DB = require('./db')
const RunCommands = require('./commands/runcommands')

RunCommands()

const app = UWS.App()
app.get('/', (res, req) => {
  res.onAborted()
  FS.readFile('src/index.html').then(file => res.end(file))
})
app.get('/*', (res, req) => {
  res.onAborted()
  FS.readFile(`src${req.getUrl()}`).then(file => res.end(file), rej => res.end(''))
})
app.get('/nodes', (res, req) => {
  res.onAborted()
  const query = req.getQuery().split('&').reduce((result, v) => {
    const split = v.split('=')
    result[split[0]] = split[1]
    return result
  }, {})
  DB.getNodes(query.date).then(nodes => res.end(JSON.stringify(nodes)))
})
app.listen(5000, () => {})