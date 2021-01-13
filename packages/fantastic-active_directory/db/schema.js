const schema = [
  `CREATE TABLE IF NOT EXISTS users(
    user_id BLOB PRIMARY KEY,
    username TEXT,
    session_id TEXT
  )`
]

module.exports = schema