# Configuration

The application can be configured using `config/config.json`

## use_child_process

If this is enabled the data acquisition will run in a different process from the http server making the requests more responsive. You generally want this enabled, the option to turn it off mostly exists for debugging purposes.

## port

The port used to connect to the server.

## data_sources

The server will run these files from the `config/data_sources` directory to acquire data about the network and store it in the database. See [Data Sources](data_source.md) for more information.