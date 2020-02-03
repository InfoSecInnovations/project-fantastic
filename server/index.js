const UWS = require('uWebSockets.js')
const FS = require('fs').promises
const DB = require('./db')
const {fork} = require('child_process')
const RunCommands = require('./commands/runcommands')

const child_process = false // if we want good debugger support in VSCode we have to run everything in the main process
const processes = []

DB.init()
.then(() => {
  if (child_process) {
    const get_data = fork('./getdata.js', [], {execArgv: []}) // execArgv is a workaround to not break the VSCode debugger
    processes.push(get_data)
    get_data.on('error', err => console.log(err.message))
  }
  else {
    RunCommands()
  }
})

process.on('exit', () => processes.forEach(v => v.kill()))

const app = UWS.App()
app.get('/', (res, req) => {
  res.onAborted()
  FS.readFile('src/index.html').then(file => res.end(file))
})
app.get('/*', (res, req) => {
  res.onAborted()
  const path = req.getUrl()
  if (path.endsWith('.svg')) res.writeHeader('Content-Type', 'image/svg+xml')
  FS.readFile(`src${path}`).then(file => res.end(file), rej => res.end(''))
})
app.get('/nodes', (res, req) => {
  res.onAborted()
  console.log('-----------')
  console.log('http request for nodes incoming...')
  const start = Date.now()
  const query = req.getQuery().split('&').reduce((result, v) => {
    const split = v.split('=')
    const value = split[1].split(',')
    result[split[0]] = value.length === 1 ? value[0] : value
    return result
  }, {})
  console.log(`from ${Math.floor((Date.now() - query.date) / 1000 / 60)} minutes ago`)
  console.log(`connection type: ${query.connection_type}`)
  console.log(`connection state: ${query.connection_state}`)
  DB.getNodes(query.date, query.connection_type, query.connection_state).then(nodes => {
    console.log(`got nodes from database in ${Date.now() - start}ms, returning results!`)
    console.log('-----------')
    res.end(JSON.stringify(nodes))
  })
})
app.listen(5000, () => {})