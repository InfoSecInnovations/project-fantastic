const uuid4 = require('uuid').v4

const generateBinaryId = () => {
  const buff = new Buffer.alloc(16)
  uuid4(null, buff)
  return buff
}

module.exports = generateBinaryId