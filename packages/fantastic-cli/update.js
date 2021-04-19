#!/usr/bin/env node

const FS = require('fs-extra')
const IsInstalled = require('is-installed')
const RunProcess = require('@infosecinnovations/fantastic-utils/runprocess')

const npm_cmd = process.platform === 'win32'? 'npm.cmd' : 'npm'
const npx_cmd = process.platform === 'win32'? 'npx.cmd' : 'npm'
const base_module = '@infosecinnovations/project-fantastic'

const isiModules = [
  '@infosecinnovations/fantastic-default',
  '@infosecinnovations/fantastic-default_auth',
  '@infosecinnovations/fantastic-active_directory'
]

const run = async () => {
  try {
    const args = process.argv.slice(3, process.argv.length)
    let tag = args[0] || '@latest'
    if (!tag.startsWith('@')) tag = `@${tag}`
    console.log(`Updating Fantastic to ${tag} tag...`)
    const is_module = await FS.pathExists('package.json')
    if (!is_module) return console.log("Couldn't find package.json, please install Fantastic first using npx fantastic-cli init!")
    const fantastic_installed = await IsInstalled('@infosecinnovations/project-fantastic')
    if (!fantastic_installed) return console.log("Couldn't find Fantastic installation, please install Fantastic first using npx fantastic-cli init!")
    const has_config = await FS.pathExists('config.json')
    if (!has_config) return console.log("Fantastic installation was found, but couldn't find config.json, please initialize Fantastic first using npx fantastic-cli init!")
    await RunProcess(npm_cmd, ['i', `${base_module}${tag}`], 'npm i failed for Fantastic base module')
    const packageJSON = await FS.readJSON('package.json')
    for (const m of isiModules) {
      if (packageJSON.dependencies[m]) await RunProcess(npm_cmd, ['i', `${m}${tag}`], `npm i ${m} failed`)
    }
    // check if any of the ISI modules are installed and update those if so
    await RunProcess(npx_cmd, ['fantastic-upgrade'], 'npx fantastic-upgrade failed')
    console.log(`Updated Fantastic and dependencies to ${tag} tag.`)
  }
  catch (err) {
    console.error(err)
  }
}

run()