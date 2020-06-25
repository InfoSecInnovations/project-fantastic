const run = queries => db => db.serialize(() => {
  queries.forEach(v => db.run(v, err => err && console.log(err.message)))
})

const condition_entry = (v, compare) => {
  if (!compare) compare = '='
  if ((typeof v[1] === 'undefined' || v[1] === null) && compare === '=') return {text: `${v[0]} IS NULL`}
  if (Array.isArray(v[1])) {
    return {text: `${v[0]} ${compare} (${v[1].map(() => '?').join(', ')})`, values: v[1]}
  }
  return {text: `${v[0]} ${compare} ?`, values: v[1]}
}

const condition_group = group => {
  const groups = Array.isArray(group.columns) ? group.columns.map(v => condition_entry(v, group.compare)) : Object.entries(group.columns).map(v => condition_entry(v, group.compare))
  return {
    text: groups.map(v => v.text).join(` ${group.combine || 'AND'} `),
    values: groups.filter(v => typeof v.values !== 'undefined' && v.values !== null).map(v => v.values).flat()
  }
}

const where = conditions => {
  if (!conditions || (conditions.groups && !conditions.groups.length)) return {text: '', values: []} // TODO: filter out invalid values here, especially empty arrays
  const groups = conditions.groups ? conditions.groups.filter(v => v).map(v => condition_group(v)) : [condition_group(conditions)]
  if (!groups || !groups.length) return {text: '', values: []}
  return {
    text: `WHERE ${groups.map(v => v.text).join(` ${conditions.combine || 'AND'} `)}`,
    values: groups.map(v => v.values).flat()
  }
}

const order = order_by => {
  if (!order_by) return ''
  const text = () => {
    if (Array.isArray(order_by)) return order_by.join()
    if (typeof order_by === 'object') return Object.entries(order_by).map(v => `${v[0]} ${v[1]}`).join()
    return order_by
  }
  return `ORDER BY ${text()}`
}

const group = group_by => {
  if (!group_by) return ''
  return `GROUP BY ${group_by.join(', ')}`
}

const insert = (table, row) =>
  db => new Promise(
    (resolve, reject) => {
      const rows = Array.isArray(row) ? row : [row]
      if (!rows.length) return resolve()
      db.run(
        `INSERT INTO ${table} ${Object.keys(rows[0]).length ? `(${Object.keys(rows[0]).join()})
        VALUES${rows.map(v => `(${Object.values(v).map(v => '?').join(', ')})`).join(', ')}` : 'DEFAULT VALUES'}`,
        [
          ...(row && rows.map(v => Object.values(v)).flat() || [])
        ],
        function (err) {
          if (err) return reject(err)
          resolve(this.lastID)
        }
      )
    }
  )

const update = query =>
  db => new Promise(
    (resolve, reject) => {
      const row = Object.entries(query.row).filter(v => typeof v[1] !== 'undefined')
      const where_query = where(query.conditions)
      db.run(
        `UPDATE ${query.table}
        SET ${row.map(v => `${v[0]} = ?`).join(', ')}
        ${where_query.text};`,
        [
          ...row.map(v => v[1]),
          ...where_query.values
        ],
        function (err) {
          if (err) return reject(err)
          resolve()
        }
      )
    })

const select = query => {
  const where_query = where(query.conditions)
  if (query.pagination) {
    return {
      text: `SELECT ${(query.columns && query.columns.length && query.columns.join()) || '*'} 
      FROM ${query.table}
      ${where_query.text ? `${where_query.text} AND` : 'WHERE'} oid NOT IN (SELECT oid FROM ${query.table}
        ${where_query.text}
        ${group(query.group_by)}
        ${order(query.order_by)}
        LIMIT ${query.pagination.page_size * query.pagination.page})
      ${group(query.group_by)}
      ${order(query.order_by)}
      LIMIT ${query.pagination.page_size}`,
      values: where_query.values.concat(where_query.values)
    }
  }
  return { 
    text: `SELECT ${(query.columns && query.columns.length && query.columns.join()) || '*'} 
      FROM ${query.table}
      ${where_query.text}
      ${group(query.group_by)}
      ${order(query.order_by)}`,
    values: where_query.values
  }
}

const get = query =>
  db => new Promise(
    (resolve, reject) => {
      const select_query = select(query)
      db.get(
        select_query.text,
        select_query.values, 
        (err, row) => {
          if (err) reject(err)
          else resolve(row)
        }
      )
    }
  )

const all = query =>
  db => new Promise(
    (resolve, reject) => {
      const select_query = select(query)
      db.all(
        select_query.text,
        select_query.values, 
        (err, rows) => {
          if (err) reject(err)
          else resolve(rows)
        }
      )
    }
  )

const remove = query =>
  db => new Promise(
    (resolve, reject) => {
      const where_query = where(query.conditions)
      db.run(
        `DELETE FROM ${query.table}
        ${where_query.text}`,
        where_query.values,
        err => {
          if (err) reject(err)
          resolve()
        }
      )
    }
  )

module.exports = {insert, update, get, all, run, remove}