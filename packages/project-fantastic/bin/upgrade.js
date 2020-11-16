#!/usr/bin/env node

const FS = require('fs-extra')
const version = require('../version')

FS.writeFile('.current_version', version)