const RunAction = require('../actions/runaction')
const HasRole = require('@infosecinnovations/fantastic-utils/hasrole')
const GetPackagedData = require('../util/getpackageddata')
const End = require('./end')
const {transaction} = require('../db')
const GetConnectionData = require('../util/getconnectiondata')
const getData = require('../db/getuserhistory/getdata')

const postActions = async (user, res, req, query, actions, data) => {
  console.log(`postActions: received http request to execute ${query.action} on node ${query.node_id}...`)
  if (!actions.includes(query.action)) return End(res)
  const action = await GetPackagedData(query.action, 'actions')
  if (!HasRole(user, action.role)) return End(res)
  const date = Date.now()
  const db = await transaction()
  const opts = {data: {...(query.connection && await GetConnectionData(db, query.connection)), ...(action.functions.run.inputs && data && JSON.parse(data))}}
  const result = await RunAction(db, query.action, 'run', query.node_id, user, date, opts)
  const history_id = await db.insert('all_history', {event_type: 'action', date, user_id: user.user_id, event_id: result.event_id})
  const history_item = await getData(db, {history_id, event_type: 'action', date, user_id: user.user_id, event_id: result.event_id})
  await db.close()
  if (res.aborted) return
  res.end(JSON.stringify({result: result.result.results, filter: result.result.filter, date, history_item}))
  console.log(`postActions: ${query.action} executed on node ${query.node_id}`)
}

module.exports = postActions