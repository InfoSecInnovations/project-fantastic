# Configuration

The application can be configured using `server/config/config.json`. If the `config` directory doesn't exist the values from `server/default_config` will be used. You can run `server/scripts/defaultconfig.js` to copy the default config, this will also happen automatically if you modify host data commands via the client.

## use_child_process

If this is enabled the data acquisition will run in a different process from the http server making the requests more responsive. You generally want this enabled, the option to turn it off mostly exists for debugging purposes.

## port

The port used to connect to the server.

## actions

Array of package names to get actions from.

## host_data_commands

The object keys indicate which packages should be used for host data commands, the `force` array indicates which host data commands must always be enabled, and the `default_enabled` array indicates which commands will be enabled by default. Other commands from the package will be available, but disabled by default.

**IMPORTANT:** if you remove any of the defaults from the forced commands you run the risk of not collecting enough data to be useful. We recommend that you have at least one of each of these data types enabled at all times: `ips`, `macs`, `connections`.

## quests

Array of package names to get quests from.

## tests

Array of package names to get tests from.

## authentication

Package to use for user authentication.