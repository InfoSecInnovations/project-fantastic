const UWS = require('uWebSockets.js')
const FS = require('fs').promises
const GetNetTcpConnection = require('./getnettcpconnection')

let nodes = []

console.log('getting results from get-nettcpconnection, please wait...')
GetNetTcpConnection().then(res => {
  nodes = nodes.concat(res)
  console.log('get-nettcpconnection results ready')
})

const app = UWS.App()
app.get('/', (res, req) => {
  res.onAborted()
  FS.readFile('index.html').then(file => res.end(file))
})
app.get('/*', (res, req) => {
  res.onAborted()
  FS.readFile(req.getUrl().replace('/', '')).then(file => res.end(file), rej => res.end(''))
})
app.get('/nodes', (res, req) => {
  res.end(JSON.stringify(nodes))
})
app.listen(5000, () => {})