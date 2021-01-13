const schema = [
  `CREATE TABLE IF NOT EXISTS users(
    user_id BLOB PRIMARY KEY,
    username TEXT,
    password TEXT,
    session_id TEXT,
    admin_session_id TEXT,
    role TEXT
  )`
]

module.exports = schema