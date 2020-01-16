const path = require('path')

module.exports={
  mode:'development',
  entry:'./main.js',
  output:{
    path: path.resolve(__dirname, '../server/src'),
    filename:'main.js'
  }
}