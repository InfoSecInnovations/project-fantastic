const abort = res => {
  res.onAborted(() => {
    console.log('HTTP request aborted!')
    res.aborted = true
  })
}

module.exports = abort