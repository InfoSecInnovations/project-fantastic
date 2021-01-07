const DB = require('../db')

const upgrade = () => DB.run([
    `CREATE TABLE IF NOT EXISTS story_history(
      story_id INTEGER PRIMARY KEY,
      story TEXT,
      story_node_id TEXT,
      rows TEXT,
      date INTEGER,
      user_id TEXT
    )`,

    'PRAGMA foreign_keys = OFF',
    'BEGIN TRANSACTION',
    `CREATE TABLE action_history_new( 
      action_id INTEGER PRIMARY KEY,
      action TEXT,
      function TEXT,
      label TEXT,
      result TEXT,
      data TEXT,
      date INTEGER,
      filter INTEGER,
      node_id INTEGER,
      user_id TEXT,
      test_id INTEGER,
      story_id,
      FOREIGN KEY (node_id)
        REFERENCES nodes (node_id)
        ON DELETE CASCADE,
      FOREIGN KEY (test_id)
        REFERENCES test_history (test_id)
        ON DELETE CASCADE,
      FOREIGN KEY (story_id)
        REFERENCES story_history (story_id)
        ON DELETE CASCADE
    )`,
    'INSERT INTO action_history_new SELECT * FROM action_history',
    'DROP TABLE action_history',
    'ALTER TABLE action_history_new RENAME TO action_history',
    'COMMIT',
    'PRAGMA foreign_keys = ON',

    'PRAGMA foreign_keys = OFF',
    'BEGIN TRANSACTION',
    `CREATE TABLE test_history_new( 
      test_id INTEGER PRIMARY KEY,
      test TEXT,
      results TEXT,
      parameters TEXT,
      date INTEGER,
      user_id TEXT,
      quest_id INTEGER,
      story_id,
      FOREIGN KEY (quest_id)
        REFERENCES quest_history (quest_id)
        ON DELETE CASCADE,
      FOREIGN KEY (story_id)
        REFERENCES story_history (story_id)
        ON DELETE CASCADE
    )`,
    'INSERT INTO test_history_new SELECT * FROM test_history',
    'DROP TABLE test_history',
    'ALTER TABLE test_history_new RENAME TO test_history',
    'COMMIT',
    'PRAGMA foreign_keys = ON'
  ])

module.exports = upgrade