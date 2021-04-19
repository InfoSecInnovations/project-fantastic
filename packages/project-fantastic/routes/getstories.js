const GetPackagedData = require('../util/getpackageddata')
const HasRole = require('@infosecinnovations/fantastic-utils/hasrole')

const getStories = (user, res, req, query, stories) => {
  console.log('getStories: received http request to get available stories...')
  Promise.all(stories
    .map(v => GetPackagedData(v, 'stories').then(s => ({...s, key: v})))
  )
  .then(stories => {
    const story_data = stories.filter(v => HasRole(user, v.role)) // TODO: filter out invalid scripts and warn the user
    .reduce((result, v) => ({ 
      ...result, 
      [v.key]: {
        key: v.key,
        name: v.name, 
        description: v.description, 
        hosts: v.questConfig.hosts,
        role: v.questConfig.role,
        nodeData: v.nodeData,
        selection: v.questConfig.selection,
        module: v.module
      }
    }), {})
    if (res.aborted) return
    res.end(JSON.stringify(story_data))
    console.log(`getStories: sent metadata for ${Object.keys(story_data).length} stories.`)
  })
}

module.exports = getStories