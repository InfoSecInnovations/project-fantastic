const GetPackagedData = require('../util/getpackageddata')
const RunScan = require('../scans/runscan')
const {getNodes} = require('../db')
const ConvertTime = require('@infosecinnovations/fantastic-utils/converttime')
const DefaultParameters = require('@infosecinnovations/fantastic-utils/defaultparameters')

/**
 * Run a quest
 * @param {import('@infosecinnovations/fantastic-db/types').Operations} db 
 * @param {string} quest 
 * @param {import('@infosecinnovations/fantastic-utils/types').User} user 
 * @param {number} date 
 */
const runQuest = async (db, quest, user, date) => {
  const scan_obj = await GetPackagedData(quest, 'scans')
  const age = ConvertTime(scan_obj.quest.selection.age)
  const rows = await getNodes({date: age && Date.now() - age, access: scan_obj.hosts})
  const row_ids = rows.map(v => v.node_id)
  const event_id = await db.insert('quest_history', {quest, date, user_id: user.user_id, rows: JSON.stringify(row_ids)})
  const {results, event_id: scan_id, success} = await RunScan(db, quest, user, date, row_ids, {...DefaultParameters(scan_obj),  ...scan_obj.quest.parameters}, event_id)
  if (success) await db.update({table: 'daily_quests', row: {date_completed: date}, conditions: {columns: {user_id: user.user_id, quest}}})
  return {results, scan_id, rows, event_id}
}

module.exports = runQuest