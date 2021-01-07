const RunStoryNode = require('../stories/runstorynode')
const {transaction} = require('../db')

const postStoryNode = async (user, res, req, query, stories) => {
  console.log(`postStoryNode: Received http request to run node ${query.node} from story ${query.story}`)
  const db = await transaction()
  const result = await RunStoryNode(db, query.story, query.node, user, Date.now())
  await db.close()
  // TODO: check if we completed previous node
  // TODO: run action or test on selection
  // TODO: return node result
  res.end()
}

module.exports = postStoryNode