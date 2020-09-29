**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "server/db/schema"

# Module: "server/db/schema"

## Index

### Variables

* [schema](_server_db_schema_.md#schema)

## Variables

### schema

• `Const` **schema**: string[] = [ \`PRAGMA journal\_mode = WAL;\`, \`CREATE TABLE IF NOT EXISTS nodes( node\_id INTEGER PRIMARY KEY, hostname TEXT, date INTEGER, first\_date INTEGER, os TEXT, important INTEGER, access TEXT )\`, \`CREATE TABLE IF NOT EXISTS processes( process\_id INTEGER PRIMARY KEY, node\_id INTEGER, pid INTEGER, name TEXT, FOREIGN KEY (node\_id) REFERENCES nodes (node\_id) ON DELETE CASCADE )\`, \`CREATE TABLE IF NOT EXISTS connections( connection\_id INTEGER PRIMARY KEY, from\_id INTEGER, to\_id INTEGER, process\_id INTEGER, local\_port INTEGER, remote\_port INTEGER, state TEXT, date INTEGER, first\_date INTEGER, FOREIGN KEY (from\_id) REFERENCES nodes (node\_id) ON DELETE CASCADE, FOREIGN KEY (to\_id) REFERENCES nodes (node\_id) ON DELETE CASCADE, FOREIGN KEY (process\_id) REFERENCES processes (process\_id) ON DELETE CASCADE )\`, \`CREATE TABLE IF NOT EXISTS ips( ip\_id INTEGER PRIMARY KEY, ip TEXT, node\_id INTEGER, date INTEGER, first\_date INTEGER, FOREIGN KEY (node\_id) REFERENCES nodes (node\_id) ON DELETE CASCADE )\`, \`CREATE TABLE IF NOT EXISTS macs( mac\_id INTEGER PRIMARY KEY, mac TEXT, vendor TEXT, node\_id INTEGER, FOREIGN KEY (node\_id) REFERENCES nodes (node\_id) ON DELETE CASCADE )\`, \`CREATE TABLE IF NOT EXISTS action\_history( action\_id INTEGER PRIMARY KEY, action TEXT, function TEXT, label TEXT, result TEXT, data TEXT, date INTEGER, filter INTEGER, node\_id INTEGER, user\_id TEXT, test\_id INTEGER, FOREIGN KEY (node\_id) REFERENCES nodes (node\_id) ON DELETE CASCADE, FOREIGN KEY (test\_id) REFERENCES test\_history (test\_id) ON DELETE CASCADE )\`, \`CREATE TABLE IF NOT EXISTS quest\_history( quest\_id INTEGER PRIMARY KEY, quest TEXT, rows TEXT, date INTEGER, user\_id TEXT )\`, \`CREATE TABLE IF NOT EXISTS test\_history( test\_id INTEGER PRIMARY KEY, test TEXT, results TEXT, parameters TEXT, date INTEGER, user\_id TEXT, quest\_id INTEGER, FOREIGN KEY (quest\_id) REFERENCES quest\_history (quest\_id) ON DELETE CASCADE )\`, \`CREATE TABLE IF NOT EXISTS command\_history( command\_id INTEGER PRIMARY KEY, command TEXT, status INTEGER, date INTEGER )\`, \`CREATE TABLE IF NOT EXISTS approval\_history( approval\_id INTEGER PRIMARY KEY, test\_id INTEGER, approved INTEGER, user\_id TEXT, FOREIGN KEY (test\_id) REFERENCES test\_history (test\_id) ON DELETE CASCADE )\`, \`CREATE TABLE IF NOT EXISTS all\_history( history\_id INTEGER PRIMARY KEY, event\_type TEXT, event\_id INTEGER, date INTEGER, user\_id TEXT )\`, \`CREATE TABLE IF NOT EXISTS favorites( favorite\_id INTEGER PRIMARY KEY, history\_id INTEGER, user\_id TEXT, sorting INTEGER, FOREIGN KEY (history\_id) REFERENCES all\_history (history\_id) ON DELETE CASCADE )\`, \`CREATE TABLE IF NOT EXISTS action\_data( action\_data\_id INTEGER PRIMARY KEY, action TEXT, function TEXT, label TEXT, data TEXT, user\_id TEXT )\` ]

*Defined in [server/db/schema.js:1](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/db/schema.js#L1)*
