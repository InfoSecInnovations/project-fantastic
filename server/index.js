const UWS = require('uWebSockets.js')
const FS = require('fs').promises
const Shell = require('node-powershell')

const ps = new Shell({
  executionPolicy: 'Bypass',
  noProfile: true
})

let nodes
ps.addCommand('get-nettcpconnection | ConvertTo-Json')
ps.invoke().then(res => nodes = res)

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
  res.end(nodes)
})
app.listen(5000, () => {})