#!/usr/bin/env node

const FS = require('fs-extra')
const RunProcess = require('@infosecinnovations/fantastic-utils/runprocess')
const checkInstalled = require('./checkinstalled')

const npm_cmd = process.platform === 'win32'? 'npm.cmd' : 'npm'
const npx_cmd = process.platform === 'win32'? 'npx.cmd' : 'npm'
const base_module = '@infosecinnovations/project-fantastic'

const isiModules = [
  '@infosecinnovations/fantastic-default',
  '@infosecinnovations/fantastic-default_auth',
  '@infosecinnovations/fantastic-active_directory'
]

const update = async tag => {
  if (!tag.startsWith('@')) tag = `@${tag}`
  console.log(`Updating Fantastic to ${tag} tag...`)
  await checkInstalled()
  await RunProcess(npm_cmd, ['i', `${base_module}${tag}`], 'npm i failed for Fantastic base module')
  const packageJSON = await FS.readJSON('package.json')
  for (const m of isiModules) {
    if (packageJSON.dependencies[m]) await RunProcess(npm_cmd, ['i', `${m}${tag}`], `npm i ${m} failed`)
  }
  // check if any of the ISI modules are installed and update those if so
  await RunProcess(npx_cmd, ['fantastic-upgrade'], 'npx fantastic-upgrade failed')
  console.log(`Updated Fantastic and dependencies to ${tag} tag.`)
}

module.exports = update