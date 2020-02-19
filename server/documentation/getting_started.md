# Getting Started

## Installation

Clone the repository and run `npm i` inside it.

## Running the server

Simply run `npm start` in the repository's directory.

For more information about configuring the application see:
- [Configuration](config.md)
- [Data Sources](data_source.md)

## Using the client

To access the client use the port defined in the config file. The default is 5000. If you are running the server locally using this default port, go to `localhost:5000`.

The default view will show you data about your network gathered within the last 30 minutes. Each node on the graph represents a host, and the arrows between them indicate connections.