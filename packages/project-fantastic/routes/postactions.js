const RunAction = require('../actions/runaction')
const HasRole = require('@infosecinnovations/fantastic-utils/hasrole')
const GetPackagedData = require('../util/getpackageddata')
const End = require('./end')
const {transaction} = require('../db')
const GetConnectionData = require('../util/getconnectiondata')

const postActions = async (user, res, req, query, actions) => {
  console.log(`postActions: received http request to execute ${query.action} on node ${query.node_id}...`)
  if (!actions.includes(query.action)) return End(res)
  const action = await GetPackagedData(query.action, 'actions')
  if (!HasRole(user, action.role)) return End(res)
  const date = Date.now()
  const db = await transaction()
  const opts = query.connection && {data: await GetConnectionData(db, query.connection)}
  const result = await RunAction(db, query.action, 'run', query.node_id, user, date, opts)
  await db.insert('all_history', {event_type: 'action', event_id: result.event_id, date, user_id: user.user_id})
  await db.close()
  if (res.aborted) return
  res.end(JSON.stringify({result: result.result.results, filter: result.result.filter, date}))
  console.log(`postActions: ${query.action} executed on node ${query.node_id}`)
}

module.exports = postActions