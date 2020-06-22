# Fantastic Full Source Code

## Installation

Clone the repository and run `npm i` inside the repository root.

## Getting started

If you just want to start the server, navigate to the `server` directory and run `npm start` as administrator. Closing the window will stop the server.

Using the default self signed certificate bundled with the app will cause warnings in the browser, but you can safely ignore these. If you want to use your own certificate, just create the `server/cert` directory with files named `cert` and `key`, please don't put it anywhere else as that may result in you committing your private key to GitHub!

**You do not have to build the client**, however the front end has 2 different directories: `front/main_interface` and `front/node_viewer`, the Node Viewer being the tab which breaks out from the main interface when you want to inspect a single host. These are already built and can be found in the `server/src` directory, however if you wish to build them again, navigate to the appropriate directory and run `npm run js` which will rebuild any changes as you make them.

Currently supported browsers:
  - Google Chrome
  - Mozilla Firefox

Currently unsupported browsers:
  - Microsoft Edge

Status of other browsers is unknown at this time.

For more information on using the application itself:
- [Getting Started With The Server](server/src/help/starting_server.md)
- [Client Help](server/src/help/index.md)

**PLEASE NOTE: a lot of the documentation is out of date because the project is still changing a lot, we're trying to keep this README relevant, but there's no guarantee regarding the other docs until the project is a bit more stable.**

## Known issues

- Attempting to run `npm i` after the project has already been installed results in errors. A workaround that seems to solve this is to delete all node_modules directories and all package-lock.json files from the project directory (just skip any that can't be deleted, this is due to symlinks)

## Contributing

If you wish to propose modifications to the project, please create a branch or fork to work on the proposed changes and submit a pull request when you're ready. We don't want unapproved changes to master, thanks!

Please contact [Mick](https://github.com/besimorhino) or [Sebastian](https://github.com/sebovzeoueb) if you need more information about the project.