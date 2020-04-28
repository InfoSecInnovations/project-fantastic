const schema = [
  `CREATE TABLE IF NOT EXISTS users(
    user_id INTEGER PRIMARY KEY,
    username TEXT,
    password TEXT,
    session_id TEXT,
    role TEXT
  )`
]

module.exports = schema