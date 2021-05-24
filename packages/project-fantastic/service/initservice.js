const { Service } = require('node-windows')
const path = require('path')

const svc = () => new Service({
    name: 'Fantastic Test Service',
    description: 'pls ignore',
    script: path.join(__dirname, '..', 'index.js')
})

module.exports = svc