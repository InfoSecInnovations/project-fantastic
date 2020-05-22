const getHttpData = res => new Promise((resolve, reject) => {
  let buffer
  res.onData((data, isLast) => {
    let chunk = Buffer.from(data)
    buffer = buffer ? Buffer.concat([buffer, chunk]) : Buffer.concat([chunk])
    if (isLast) resolve(buffer.toString())
  })
})

module.exports = getHttpData