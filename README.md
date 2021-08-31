# Fantastic

## About

![Fantastic UI](packages/fantastic-help/images/fantastic-ui.png)
Fantastic is a visualizing tool made by [InfoSec Innovations](https://www.infosecinnovations.com/) for exploring computer networks. It aims to provide a way for network security novices and professionals alike to find and fix security issues. If you don't know where to start, the quest system (work in progress!) will guide you, or you can ignore it and try out the various options by yourself.

## Requirements

- We'll only be supporting Windows 10 for the forseeable future, but other platforms may be added if there's a demand for it.
- [Node.js](https://nodejs.org/en/download/) >= 12 (latest is recommended). You'll need to check "Automatically install the necessary tools" during the install process.
- If you don't have git cli installed you will need that first. You can install it using [Chocolatey](https://chocolatey.org/packages/git) or [Git for Windows](https://git-scm.com/download/win).
- You should install [nmap](https://nmap.org/) if using the default module.
- If you're having trouble with the installation, please try installing [windows-build-tools](https://www.npmjs.com/package/windows-build-tools) and let us know so we can confirm that this is a dependency.

## Getting Started

To install Fantastic, simply create an empty directory where you want to run the server from and run `npx fantastic-cli init`. Depending on the authentication system used, you may have to configure an admin account. Try using `npm cache verify` to clean up the npm cache if the install command isn't working.

Once Fantastic has been installed, use `npm start` as administrator to run it. You can access the client at `localhost:5000` by default.

If you want to have it running all the time, you can now [install it as a service](./service.md) instead (but make sure you stop the app before doing this to avoid conflicts).

Currently supported browsers:
  - Google Chrome and probably other Chromium browsers
  - Mozilla Firefox

Status of other browsers is unknown at this time.

For more information on using the application itself:
- [Client Help](packages/fantastic-help/index.md)
- [Administrating the Fantastic Server](packages/fantastic-help/server.md)
- [Fantastic CLI](packages/fantastic-cli/README.md)
- [ActiveDirectory authentication](packages/fantastic-active_directory/README.md)

## Creating your own content

If you already know some PowerShell commands, creating modules for Fantastic should be pretty straightforward for you. All of the assets are stored as JSON, one day you'll be able to edit them with the Fantastic Editor, but for now you have to work with the JSON directly, which is a still a fairly human-readable format.

### Initialization

We use npm as the installation method for modules, so you'll want to start by running `npm init` in an empty directory to create the default `package.json` file, you can use the `-y` flag to skip the setup as you won't need to change much. You'll want the following structure:

```
my-awesome-module
|-- package.json
|-- info.json
|-- actions
|   |-- action1.json
|   |-- action2.json
|   |-- ...
|-- commands
|   |-- command1.json
|   |-- command2.json
|   |-- ...
|-- stories
|   |-- story1.json
|   |-- story2.json
|   |-- ...
|-- scans
|   |-- scan1.json
|   |-- scan2.json
|   |-- ...
```

See the relevant help sections for how to implement each data type:

- [Actions](packages/fantastic-help/actions.md)
- [Host Data Commands](packages/fantastic-help/commands.md)
- [Scans](packages/fantastic-help/scans.md) (Daily Quests are just Scans with the quest field enabled)
- [Story Quests](packages/fantastic-help/stories.md)

`info.json` is an optional file that currently just contains a `name` property which allows you to give a display name to your module

To try out your module locally you can simply go to your Fantastic install directory and do `npm i path/to/your/awesome/module` and then add the package name to the config file. If you want it to be available online, just publish it to the npm registry or GitHub and follow the standard npm installation process.

### Fantastic Editor

The Fantastic Editor is very much a work in progress. The objective is to be able to edit and create most types of content without having to write any code or JSON directly. For the moment you can only use it to create story quests, in fact, the Forgotten Systems story was made with it.

We haven't implemented the standalone build for it, so if you want to try it out you'll need to clone the repository, and open up the `editor` directory in the command line and use the `npm start` command to run it.

## Development setup

### Installation

- Clone the repository and run `npm i` inside the repository root.
- Run `npx lerna bootstrap` to set up all the packages that make up the Fantastic development environment.

### Test environment

There's a typical environment set up in the `dev-test/project-fantastic` directory so you can test modifications to the source code easily. Just run `npm start` in the `dev-test/project-fantastic` directory to start Fantastic, there is also a `launch.json` included for Visual Studio Code to run this command and debug. Just run the upgrade command and enter the admin credentials you wish to use when prompted.

There's also a test set up in `dev-test/fantastic-cli` to test out the CLI installer app. Note that the dependencies will be pulled from npm and not from the local repository, so only local changes to the fantastic-cli package itself will be reflected in the test. `npm start` will empty the test directory and run the installer inside it again.

### Front-end

**You do not have to build the client**, there are 3 different pages which are built using webpack. These are already built and can be found in the `packages/project-fantastic/src` directory. However if you need to modify them, the source can be found in the `front` directory. The individual directories are: 
  - `main_interface` - the app's main view. Builds to `main.js`.
  - `node_viewer` - the pop out view to inspect hosts. Builds to `viewer.js`.
  - `logs` - the logs screen viewable by admins. Builds to `logs.js`.

The command to build them is `npm run js`. If you run this in the top level `front` directory it will build all 3, or you can run it in an individual directory. It will automatically build your changes until you close the terminal.

The CSS is built using [Stylus](https://stylus-lang.com/). You can run the build by going to the `front/css` directory and running `npm run css`. The main files are in the `output` directory: each `.styl` file from this directory will be built to a corresponding `.css` file on the server.

**PLEASE NOTE: a lot of the documentation is out of date because the project is still changing a lot, we're trying to keep this README relevant, but there's no guarantee regarding the other docs until the project is a bit more stable.**

Please join our [Discord](https://discord.gg/JBVQF6tjzc) to discuss this project and provide feedback!