const abort = res => {
  console.log('HTTP request aborted!')
  console.log('-----------')
  res.aborted = true
}

module.exports = abort