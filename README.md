# Fantastic

## About

![Fantastic UI](packages/fantastic-help/images/fantastic-ui.png)
Fantastic is a visualizing tool made by [InfoSec Innovations](https://www.infosecinnovations.com/) for exploring computer networks. It aims to provide a way for network security novices and professionals alike to find and fix security issues. If you don't know where to start, the quest system (work in progress!) will guide you, or you can ignore it and try out the various options by yourself.

## Requirements

- We'll only be supporting Windows 10 for the forseeable future, but other platforms may be added if there's a demand for it.
- [Node.js](https://nodejs.org/en/download/) >= 12 (latest is recommended). You'll need to check "Automatically install the necessary tools" during the install process.
- If you don't have git cli installed you will need that first. You can install it using [Chocolatey](https://chocolatey.org/packages/git) or [Git for Windows](https://git-scm.com/download/win).

## Getting Started

To install Fantastic, simply create a directory where you want to run the server from and run `npx fantastic-cli init`. Depending on the authentication system used, you may have to configure an admin account.

Once Fantastic has been installed, use `npm start` as administrator to run it. You can access the client at `localhost:5000` by default.

Currently supported browsers:
  - Google Chrome
  - Mozilla Firefox

Currently unsupported browsers:
  - Microsoft Edge

Status of other browsers is unknown at this time.

For more information on using the application itself:
- [Client Help](packages/fantastic-help/index.md)
- [Administrating the Fantastic Server](packages/fantastic-help/server.md)

## Development setup

### Installation

- Clone the repository and run `npm i` inside the repository root.
- Run `npx lerna bootstrap` to set up all the packages that make up the Fantastic development environment.

### Test environment

There's a typical environment set up in the `dev-test/project-fantastic` directory so you can test modifications to the source code easily. Just run `npm start` in the `dev-test/project-fantastic` directory to start Fantastic, there is also a `launch.json` included for Visual Studio Code to run this command and debug. The admin account will have the username 'admin' and the password 'changeme' by default. You should probably change it to something more secure as Fantastic is a powerful tool when you have admin access!

There's also a test set up in `dev-test/fantastic-cli` to test out the CLI installer app. Note that the dependencies will be pulled from npm and not from the local repository, so only local changes to the fantastic-cli package itself will be reflected in the test. `npm start` will empty the test directory and run the installer inside it again.

### Front-end

**You do not have to build the client**, there are 3 different pages which are built using webpack. These are already built and can be found in the `packages/project-fantastic/src` directory. However if you need to modify them, the source can be found in the `front` directory. The individual directories are: 
  - `main_interface` - the app's main view. Builds to `main.js`.
  - `node_viewer` - the pop out view to inspect hosts. Builds to `viewer.js`.
  - `logs` - the logs screen viewable by admins. Builds to `logs.js`.

The command to build them is `npm run js`. If you run this in the top level `front` directory it will build all 3, or you can run it in an individual directory. It will automatically build your changes until you close the terminal.

The CSS is built using [Stylus](https://stylus-lang.com/). You can run the build by going to the `front/css` directory and running `npm run css`. The main files are in the `output` directory: each `.styl` file from this directory will be built to a corresponding `.css` file on the server.

**PLEASE NOTE: a lot of the documentation is out of date because the project is still changing a lot, we're trying to keep this README relevant, but there's no guarantee regarding the other docs until the project is a bit more stable.**

Please contact [Mick](https://github.com/besimorhino) or [Sebastian](https://github.com/sebovzeoueb) if you need more information about the project.