const path = require('path')

module.exports={
  mode: 'production',
  entry: path.resolve(__dirname, 'main.js'),
  output:{
    path: path.resolve(__dirname, '../../packages/project-fantastic/src'),
    filename:'logs.js'
  }
}