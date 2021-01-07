const GetPackagedData = require('../util/getpackageddata')

const postStoryNode = async (user, res, req, query, stories) => {
  const story = await GetPackagedData(query.story, 'stories')
  const node = story.nodeData[query.node]
  const data = await GetPackagedData(node.key, node.type)
  console.log(`postStoryNode: Received http request to run node ${query.node} from story ${query.story}`)
  console.log(`postStoryNode: Running ${node.type == 'tests' ? 'test' : 'action'} ${data.name}`)
  // TODO: check if we completed previous node
  // TODO: run action or test on selection
  // TODO: return node result
  res.end()
}

module.exports = postStoryNode