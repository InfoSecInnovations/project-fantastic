# Fantastic Full Source Code

## Installation

Clone the repository and run `npm i` inside it as administrator.

## Getting started

If you just want to run the server, navigate to the `server` directory and use the `npm start`, if you want to run commands which need admin permissions, you will need to run the server as admin. Using the default self signed certificate bundled with the app will cause warnings in the browser, but you can safely ignore these! If you want to use your own certificate, just replace `cert` and `key` files in the `server/cert` directory.

The client has 2 different directories: `front/main_interface` and `front/node_viewer`, the Node Viewer being the tab which breaks out from the main interface when you want to inspect a single host. These are already built and can be found in the `server/src` directory, however if you wish to build them again, navigate to the appropriate directory and run `npm run js` which will rebuild any changes as you make them.

Note that when accessing the client you must specify HTTPS in the address otherwise it will fail to load, redirecting HTTP traffic is on our todo.

For more information on using the application itself:
- [Getting Started With The Server](server/src/help/starting_server.md)
- [Client Help](server/src/help/index.md)