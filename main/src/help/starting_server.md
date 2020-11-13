# Getting Started With The Server

## Installation

Run `npm i` inside the server directory (or the top level repository if working with the full project source code).

## Running the server

Simply run `npm start` in the server directory as administrator. Closing the window will stop the server.

For more information about configuring the application see:
- [Configuration](config.md)
- // TODO: document host data commands
- [Actions](actions.md)
- // TODO: document tests
- // TODO: document quests 

## Accessing the client

To access the client use the port defined in the config file. The default is 5000. If you are running the server locally using this default port, go to `http://localhost:5000`.

For more information about using the client see the [Client Help](index.md)

## Updating

If you see a version mismatch message when starting the server, it means that you've pulled a version of the project that is incompatible with your current installation and you must run `npm i` to update it. Please note that we don't yet support migrating data, and it will delete the application's database. When we reach a more stable state, graceful upgrading will be supported.