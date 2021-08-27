const { Service } = require('node-windows')
const path = require('path')

const svc = () => {
  const srv = new Service({
    name: 'Fantastic Test Service',
    description: 'pls ignore',
    script: path.join(__dirname, '..', 'index.js')
  })

  return srv
}



module.exports = svc