# Fantastic CLI Tool

Fantastic is a visualizing tool made by [InfoSec Innovations](https://www.infosecinnovations.com/) for exploring computer networks. It aims to provide a way for network security novices and professionals alike to find and fix security issues. If you don't know where to start, the quest system (work in progress!) will guide you, or you can ignore it and try out the various options by yourself.

This tool allows you to create an installation by simply running `npx fantastic-cli init` in the directory where you wish to install Fantastic. You will be asked if you want to use the Active Directory module to authenticate users, if not the default basic authentication module will be used. You may have some further setup options presented to you once the authentication module has been selected.

[See the GitHub repository](https://github.com/InfoSecInnovations/project-fantastic) for more information on how to install and use Fantastic.

## Commands

- `init [@version]` create a fresh Fantastic install in this directory, optionally using the specified version of Fantastic
- `update [@version]` update an existing install to latest or the specified version
- `install <package>[@version]` install and enable a module containing Fantastic content, can specify more than one module at a time like `npm install`
- `uninstall <package>` remove a Fantastic content module, can specify more than one module at a time like `npm uninstall`