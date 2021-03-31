#!/usr/bin/env node

const FS = require('fs-extra')
const IsInstalled = require('is-installed')

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
    // npm i project-fantastic@tag auth@tag
    // check if any of the ISI modules are installed and update those if so
    // run npx fantastic-upgrade
    console.log(`Updated Fantastic and dependencies to ${tag} tag.`)
  }
  catch (err) {
    console.error(err)
  }
}

run()