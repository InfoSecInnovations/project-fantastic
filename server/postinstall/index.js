const DefaultConfig = require('./defaultconfig')
const FS = require('fs-extra')

DefaultConfig()

FS.ensureSymlink('./node_modules/fantastic-cli/documentation', './src/help/fantastic-cli')