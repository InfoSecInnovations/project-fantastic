# Running Fantastic as a Service

## *this is currently very much a preview feature, use at your own risk!*

Running a node.js script as a service doesn't seem that straightforward, but we've come up with a process that works. We will look into streamlining this and generally checking it doesn't do anything undesirable, so for now please only use this if you accept the above disclaimer.

We're using the [node-windows](https://www.npmjs.com/package/node-windows) package to do this.

This set of instructions is specifically designed for the dev environment, and some parts would likely be a little different for running the production version as a service. The following steps assume you have done the initial setup for the dev environment and already run Fantastic from `dev-test/project-fantastic` at least once in order to set up the admin account.

- Navigate to `dev-test/project-fantastic` and run `npx fantastic-service` as adminstrator. This will install the service and start it as your currently logged in user.

- If you want to change the user running the service, open up the Services tool in Windows, right-click the Fantastic service, click Properties, and use the Log On tab to select the user. We were using a Managed Service Account for this, and we also needed to add it to the local Administrators group and reboot for it to work.

- To uninstall the service use the `npx fantastic-rm-service` command