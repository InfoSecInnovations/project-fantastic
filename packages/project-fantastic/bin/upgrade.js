#!/usr/bin/env node

const FS = require('fs-extra')
const version = require('../version')

Promise.all([
  FS.remove('data.db'),
  FS.remove('data.db-journal'),
  FS.remove('data.db-shm'),
  FS.remove('data.db-wal')
])
.then(() => FS.writeFile('.current_version', version.toString()))
.then(() => console.log('Upgrade complete!'))
