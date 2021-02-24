const getData = async (db, rows) => {
  const results = []
  for (const row of rows) {
    const result = await db.get({table: `${row.event_type}_history`, conditions: {columns: {[`${row.event_type}_id`]: row.event_id}}})
    if (result) {
      if (row.event_type === 'quest') {
        Object.assign(row, await db.get({
          table: 'scan_history',
          columns: ['results', 'parameters'],
          conditions: {columns: {quest_id: result.quest_id}}
        }))
      }
      // TODO: story node event type
      results.push({...row, ...result})
    }
  }
  return results
}

module.exports = getData