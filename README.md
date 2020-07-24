# Fantastic Full Source Code

## About

![Fantastic UI](fantastic-ui.png)
Fantastic is a visualizing tool made by [InfoSec Innovations](https://www.infosecinnovations.com/) for exploring computer networks. It aims to provide a way for network security novices and professionals alike to find and fix security issues. If you don't know where to start, the quest system (work in progress!) will guide you, or you can ignore it and try out the various options by yourself.

## Installation

- We'll only be supporting Windows 10 for the forseeable future, but other platforms may be added if there's a demand for it.
- If you don't have git cli installed you will need that first. You can install it using [Chocolatey](https://chocolatey.org/packages/git) or [GitHub Desktop](https://desktop.github.com/).
- Clone the repository and run `npm i` inside the repository root. Please ignore the messages saying you should commit the lockfiles (see [Known Issues](#known-issues) below).

## Getting started

If you just want to start the server, navigate to the `server` directory and run `npm start` as administrator. Closing the window will stop the server.

Using the default configuration you will be able to see the client at http://localhost:5000 in your browser, and you can log in as `admin` using the password `changeme`. Please change this password or use a different authorization module (feature coming soon!) as accessing the tool as admin allows you to perform some actions which should be used responsibly.

Using the default self signed certificate bundled with the app will cause warnings in the browser, but you can safely ignore these. If you want to use your own certificate, just create the `server/cert` directory with files named `cert` and `key`, please don't put it anywhere else as that may result in you committing your private key to GitHub!

**You do not have to build the client**, there are 3 different pages which are built using webpack. These are already built and can be found in the `server/src` directory. However if you need to modify them, the source can be found in the `front` directory. The individual directories are: 
  - `main_interface` - the app's main view. Builds to `main.js`.
  - `node_viewer` - the pop out view to inspect hosts. Builds to `viewer.js`.
  - `logs` - the logs screen viewable by admins. Builds to `logs.js`.
The command to build them is `npm run js`. If you run this in the top level `front` directory it will build all 3, or you can run it in an individual directory. It will automatically build your changes until you close the terminal.

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

- Attempting to run `npm i` after the project has already been installed can result in errors. A workaround that seems to solve this is to delete all node_modules directories and all package-lock.json files from the project directory (just skip any that can't be deleted, this is due to symlinks). Alternatively, try deleting the whole repo and cloning it again.

- The Logs page is currently broken since a recent hyperapp update. This will be fixed soon.

- Re-installing the project deletes the database and custom config as we haven't yet provided a way to gracefully upgrade.

## Contributing

If you wish to propose modifications to the project, please create a branch or fork to work on the proposed changes and submit a pull request when you're ready. We don't want unapproved changes to master, thanks!

Please contact [Mick](https://github.com/besimorhino) or [Sebastian](https://github.com/sebovzeoueb) if you need more information about the project.