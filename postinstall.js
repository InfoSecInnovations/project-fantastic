const FS = require('fs-extra')

FS.pathExists('dev-test/project-fantastic/config.json')
.then(exists => {
  if (!exists) FS.copy('dev-test/project-fantastic/default-config.json', 'dev-test/project-fantastic/config.json')
})