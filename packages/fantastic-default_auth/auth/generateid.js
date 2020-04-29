const Crypto = require('crypto')

const generateId = () => new Promise((resolve, reject) => {
  Crypto.randomBytes(128, (err, buf) => {
    buf[6] = (buf[6] & 0x0f) | 0x40
    buf[8] = (buf[8] & 0x3f) | 0x80
    buf = buf.toString('hex').match(/(.{8})(.{4})(.{4})(.{4})(.{12})/)
    buf.shift()
    resolve(buf.join('-'))
  })
})

module.exports = generateId