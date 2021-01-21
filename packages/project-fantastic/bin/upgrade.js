#!/usr/bin/env node

const FS = require('fs-extra')
const version = require('../version')
const DB = require('../db')

const run = async () => {
  await FS.ensureFile('.current_version')
  const currentVersion = parseInt(await FS.readFile('.current_version'))
  if (!currentVersion) {
    console.log('No current version was found, initializing database...')
    await DB.init()
  } 
  else {
    for (let i = currentVersion + 1; i <= version; i++) {
      try {
        const upgradeFunc = require(`../upgrade/${i}`)
        if (upgradeFunc){
          console.log(`running database upgrade script for version ${i}...`)
          await upgradeFunc()
          .catch(err => console.error(err))
        }
      }
      catch (e) {}
    }
  }
  await FS.writeFile('.current_version', version.toString())
  console.log(`upgraded database to version ${version}`)
}

run()
