const schema = [
  `PRAGMA journal_mode = WAL;`,
  `CREATE TABLE IF NOT EXISTS nodes(
    node_id INTEGER PRIMARY KEY,
    hostname TEXT,
    date INTEGER,
    first_date INTEGER,
    os TEXT,
    important INTEGER,
    access TEXT
  )`,
  `CREATE TABLE IF NOT EXISTS processes(
    process_id INTEGER PRIMARY KEY,
    node_id INTEGER,
    pid INTEGER,
    name TEXT,
    FOREIGN KEY (node_id)
      REFERENCES nodes (node_id)
      ON DELETE CASCADE
  )`,
  `CREATE TABLE IF NOT EXISTS connections(
    connection_id INTEGER PRIMARY KEY,
    from_id INTEGER,
    to_id INTEGER,
    process_id INTEGER,
    local_port INTEGER,
    remote_port INTEGER,
    state TEXT,
    date INTEGER,
    first_date INTEGER,
    FOREIGN KEY (from_id)
      REFERENCES ips (ip_id)
      ON DELETE CASCADE,
    FOREIGN KEY (to_id)
      REFERENCES ips (ip_id)
      ON DELETE CASCADE,
    FOREIGN KEY (process_id)
      REFERENCES processes (process_id)
      ON DELETE CASCADE
  )`,
  `CREATE TABLE IF NOT EXISTS ips(
    ip_id INTEGER PRIMARY KEY,
    ip TEXT,
    node_id INTEGER,
    date INTEGER,
    first_date INTEGER,
    FOREIGN KEY (node_id)
      REFERENCES nodes (node_id)
      ON DELETE CASCADE
  )`,
  `CREATE TABLE IF NOT EXISTS macs(
    mac_id INTEGER PRIMARY KEY,
    mac TEXT,
    vendor TEXT,
    node_id INTEGER,
    FOREIGN KEY (node_id)
      REFERENCES nodes (node_id)
      ON DELETE CASCADE
  )`,
  `CREATE TABLE IF NOT EXISTS action_history(
    action_id INTEGER PRIMARY KEY,
    action TEXT,
    function TEXT,
    label TEXT,
    result TEXT,
    data TEXT,
    date INTEGER,
    filter INTEGER,
    node_id INTEGER,
    user_id BLOB,
    scan_id INTEGER,
    story_id INTEGER,
    FOREIGN KEY (node_id)
      REFERENCES nodes (node_id)
      ON DELETE SET NULL,
    FOREIGN KEY (scan_id)
      REFERENCES scan_history (scan_id)
      ON DELETE CASCADE,
    FOREIGN KEY (story_id)
      REFERENCES story_history (story_id)
      ON DELETE CASCADE
  )`,
  `CREATE TABLE IF NOT EXISTS quest_history(
    quest_id INTEGER PRIMARY KEY,
    quest TEXT,
    rows TEXT,
    date INTEGER,
    user_id BLOB
  )`,
  `CREATE TABLE IF NOT EXISTS scan_history(
    scan_id INTEGER PRIMARY KEY,
    scan TEXT,
    results TEXT,
    parameters TEXT,
    date INTEGER,
    user_id BLOB,
    quest_id INTEGER,
    story_id INTEGER,
    age INTEGER,
    FOREIGN KEY (quest_id)
      REFERENCES quest_history (quest_id)
      ON DELETE CASCADE,
    FOREIGN KEY (story_id)
      REFERENCES story_history (story_id)
      ON DELETE CASCADE
  )`,
  `CREATE TABLE IF NOT EXISTS command_history(
    command_id INTEGER PRIMARY KEY,
    command TEXT,
    status INTEGER,
    date INTEGER
  )`,
  `CREATE TABLE IF NOT EXISTS approval_history(
    approval_id INTEGER PRIMARY KEY,
    scan_id INTEGER,
    approved INTEGER,
    user_id BLOB,
    FOREIGN KEY (scan_id)
      REFERENCES scan_history (scan_id)
      ON DELETE CASCADE
  )`,
  `CREATE TABLE IF NOT EXISTS story_history(
    story_id INTEGER PRIMARY KEY,
    story TEXT,
    story_node_id TEXT,
    rows TEXT,
    date INTEGER,
    success INTEGER,
    user_id BLOB
  )`,
  `CREATE TABLE IF NOT EXISTS selection_history(
    selection_id INTEGER PRIMARY KEY,
    min_date INTEGER,
    max_date INTEGER,
    connection_local_ip TEXT,
    connection_remote_ip TEXT,
    connection_process INTEGER,
    connection_type TEXT,
    connection_state_listen INTEGER,
    connection_state_syn_sent INTEGER,
    connection_state_syn_received INTEGER,
    connection_state_established INTEGER,
    connection_state_fin_wait_1 INTEGER,
    connection_state_fin_wait_2 INTEGER,
    connection_state_close_wait INTEGER,
    connection_state_closing INTEGER,
    connection_state_last_ack INTEGER,
    connection_state_time_wait INTEGER,
    connection_state_bound INTEGER,
    access_local INTEGER,
    access_remote INTEGER,
    access_none INTEGER,
    show_external INTEGER,
    nodes TEXT,
    label TEXT,
    date INTEGER,
    user_id BLOB
  )`,
  `CREATE TABLE IF NOT EXISTS all_history(
    history_id INTEGER PRIMARY KEY,
    event_type TEXT,
    event_id INTEGER,
    date INTEGER,
    user_id BLOB
  )`,
  `CREATE TABLE IF NOT EXISTS favorites(
    favorite_id INTEGER PRIMARY KEY,
    data_type TEXT,
    data_key TEXT,
    user_id BLOB
  )`,
  `CREATE TABLE IF NOT EXISTS saved(
    saved_id INTEGER PRIMARY KEY,
    history_id INTEGER,
    user_id BLOB,
    sorting INTEGER,
    FOREIGN KEY (history_id)
      REFERENCES all_history (history_id)
      ON DELETE CASCADE
  )`,
  `CREATE TABLE IF NOT EXISTS action_data(
    action_data_id INTEGER PRIMARY KEY,
    action TEXT,
    function TEXT,
    label TEXT,
    data TEXT,
    user_id BLOB
  )`,
  `CREATE TABLE IF NOT EXISTS completed_story_nodes(
    completed_node_id INTEGER PRIMARY KEY,
    story TEXT,
    story_node_id TEXT,
    date INTEGER,
    user_id BLOB
  )`,
  `CREATE TABLE IF NOT EXISTS daily_quests(
    daily_quest_id INTEGER PRIMARY KEY,
    user_id BLOB,
    quest TEXT,
    date_completed INTEGER
  )`,
  `CREATE TABLE IF NOT EXISTS inventory_history(
    inventory_history_id INTEGER PRIMARY KEY,
    item_name TEXT,
    user_id BLOB,
    date INTEGER,
    status INTEGER
  )`,
  `CREATE TABLE IF NOT EXISTS inventory_data(
    inventory_data_id INTEGER PRIMARY KEY,
    item_name TEXT,
    date INTEGER,
    data TEXT
  )`
]

module.exports = schema