const UWS = require('uWebSockets.js')
const FS = require('fs').promises
const GetNetTcpConnection = require('./getnettcpconnection')
const Nmap = require('./nmap')
const DB = require('./db')

DB.init()

const nmap = () => {
  console.log('getting results from nmap...')
  Nmap()
  .then(res => {
    DB.addNodes(res)
    console.log('nmap results ready')
  })
  .then(res => nmap()) // we want to continuously run nmap because it doesn't always find all the connections
}
nmap()

console.log('getting results from get-nettcpconnection...')
GetNetTcpConnection().then(res => {
  DB.addConnections(res)
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
  res.onAborted()
  DB.getNodes().then(nodes => res.end(JSON.stringify(nodes)))
})
app.listen(5000, () => {})