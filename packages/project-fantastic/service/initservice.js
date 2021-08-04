const { Service } = require('node-windows')
const path = require('path')

const svc = () => {
  const srv = new Service({
    name: 'Fantastic Test Service',
    description: 'pls ignore',
    script: path.join(__dirname, '..', 'index.js')
  })
  // TODO: can we supply credentials for the service account here?
  return srv
}



module.exports = svc