# Configuration

The application can be configured using `server/config/config.json`. If the `config` directory doesn't exist the values from `server/default_config` will be used. You can run `server/scripts/defaultconfig.js` to copy the default config, this will also happen automatically if you modify host data commands via the client.

## use_child_process

If this is enabled the data acquisition will run in a different process from the http server making the requests more responsive. You generally want this enabled, the option to turn it off mostly exists for debugging purposes.

## port

The port used to connect to the server.

## data_sources

The object keys indicate which packages should be used for host data commands, and the array values indicate which commands are enabled. See [Data Sources](data_source.md) for more information.

## quests

Array of package names to get quests from.

## tests

Array of package names to get tests from.

## authentication

Package to use for user authentication.