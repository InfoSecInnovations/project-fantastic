# Getting Started With The Server

## Installation

Clone the repository and run `npm i` inside it as administrator.

## Running the server

Simply run `npm start` in the repository's `server` directory. If you want to be able to run actions which need administrator access, you will need to run the server with administrator privileges. Closing the window will stop the server.

For more information about configuring the application see:
- [Configuration](config.md)
- [Data Sources](data_source.md)
- // TODO: document actions
- // TODO: document tests
- // TODO: document quests 

## Accessing the client

To access the client use the port defined in the config file. The default is 5000. If you are running the server locally using this default port, go to `https://localhost:5000`. Don't forget the HTTPS otherwise it won't load (redirecting HTTP traffic is on our todo).

For more information about using the client see the [Client Help](index.md)