const getData = async (db, rows) => {
  const results = []
  for (const row of rows) {
    const result = await db.get({table: `${row.event_type}_history`, conditions: {columns: {[`${row.event_type}_id`]: row.event_id}}})
    if (result) results.push({...row, ...result})
  }
  return results
}

module.exports = getData