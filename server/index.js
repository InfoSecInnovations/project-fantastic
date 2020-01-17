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
  console.log('-----------')
  console.log('http request for nodes incoming...')
  const start = Date.now()
  const query = req.getQuery().split('&').reduce((result, v) => {
    const split = v.split('=')
    result[split[0]] = split[1]
    return result
  }, {})
  console.log(`from ${Math.floor((Date.now() - query.date) / 1000 / 60)} minutes ago`)
  DB.getNodes(query.date).then(nodes => {
    console.log(`got nodes from database in ${Date.now() - start}ms, returning results!`)
    console.log('-----------')
    res.end(JSON.stringify(nodes))
  })
})
app.listen(5000, () => {})