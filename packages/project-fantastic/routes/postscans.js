const RunScan = require('../scans/runscan')
const GetPackagedData = require('../util/getpackageddata')
const HasRole = require('@infosecinnovations/fantastic-utils/hasrole')
const End = require('./end')
const {transaction} = require('../db')
const GetData = require('../db/getuserhistory/getdata')

const postScans = async (user, res, req, query, scans, data) => {
  console.log(`postScans: received http request to start ${query.scan} scan...`)
  if (!scans.includes(query.scan)) return End(res)
  const scan = await GetPackagedData(query.scan, 'scans')
  if (!HasRole(user, scan.role)) return End(res)
  const date = Date.now()
  try {
    const json = !data ? undefined : JSON.parse(data)
    if (!query.nodes || !Array.isArray(query.nodes)) return End(res)
    const db = await transaction()
    const result = await RunScan(db, query.scan, user, date, query.nodes, json)
    const history_id = await db.insert('all_history', {event_type: 'scan', event_id: result.event_id, user_id: user.user_id, date})
    await db.close()
    if (res.aborted) return
    console.log(`postScans: completed ${query.scan} scan, queried ${result.results.length} nodes`)
    const history_item = await GetData({history_id, event_type: 'scan', event_id: result.event_id, date, user})
    res.end(JSON.stringify({result: result.results, scan_id: result.event_id, date, history_item}))
  }
  catch(err) {
    return End(res)
  }
}

module.exports = postScans