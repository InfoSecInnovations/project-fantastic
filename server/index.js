const UWS = require('uWebSockets.js')
const FS = require('fs').promises
const GetNetTcpConnection = require('./getnettcpconnection')
const Nmap = require('./nmap')
const DB = require('./db')

const nmap = () => {
  console.log('getting results from nmap...')
  Nmap()
  .then(res => DB.addNodes(res))
  .then(() => console.log('nmap results ready'))
  .then(() => nmap()) // we want to continuously run nmap because it doesn't always find all the connections
}
nmap()

const get_nettcpconnection = () => {
console.log('getting results from get-nettcpconnection...')
GetNetTcpConnection()
.then(res => DB.addConnections(res))
.then(() => console.log('get-nettcpconnection results ready'))
.then(() => get_nettcpconnection()) // we want to continuously run get-nettcpconnection to find new connections
}
get_nettcpconnection()

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
  DB.getNodes(Date.now() - 30 * 1000 * 60).then(nodes => res.end(JSON.stringify(nodes))) // TODO: use http request parameters for date instead of hardcoding to last 30 minutes
})
app.listen(5000, () => {})