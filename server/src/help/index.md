# Fantastic Help

Fantastic is a visual tool to explore a computer network, analyze security flaws, and help fix them.

## Quick Start

Once the server is up and running (see [Getting Started With The Server](starting_server.md)), connect to the server's address and port (the default is 5000) and you should be greeted by the application's interface.

If you're using the supplied default authentication module you can simply enter a username and password and click register to create an account with basic access, or use the default admin account which has the username `admin` and the password `changeme`. We recommend changing the admin password if other people have access to the tool!

Currently supported browsers:
  - Google Chrome
  - Mozilla Firefox

Currently unsupported browsers:
  - Microsoft Edge

Other browsers haven't been tested yet.

// TODO: insert picture when UI is more finalised

By default Fantastic runs a set of commands that are considered "safe", meaning that they don't have any possibility of interfering with other hosts on your network. Note that this is no longer guaranteed once you start enabling other data sources or adding your own.

When first entering the interface, you are viewing data from the past 15 minutes. Each node of the graph represents a host, and the arrows between them indicate connections. If you click on a node you can see more detailed information about it.

## Search Bar

// TODO: insert picture when UI is more finalised

At the top of the screen you can change the filtering options for the data you wish to view.

- **Data from** allows you to select the timeframe. Note there can be a very large amount of data when viewing more than a few minutes of history.
- **Show hosts outside my network** allows you to toggle all the nodes belonging to hosts on the internet that hosts on your network have connections to, but aren't themselves on it.
- **Connections between** can be used to filter out internal connections within the same host.
- **Connection state** provides filtering based on the state of the connections, this can be very useful to strip down the amount of data you're looking at.

## Network Graph

// TODO: insert picture when UI is more finalised

A visual representation of the network. Each node represents a host, and the arrows show the connections between them. Clicking on a node or a connection opens the info panel where you can view more detailed information about it and perform actions if they are available. Hold shift to select multiple nodes. Note that "local host" refers to the server hosting the application, and not your own machine, which may not be the server.

## Menu

In the bottom left of the interface there are buttons to open the Host Data Commands, Tests, and Quests panels

### Host Data Commands

// TODO: insert picture when UI is more finalised

Here you can see all the available commands for getting data, and you can enable or disable them. Enabled commands will run constantly on the server and update the database.

### Tests

// TODO: insert picture when UI is more finalised

Tests run some actions and allow you to analyse the results according to the parameters you set. Upon completing the test, if any hosts didn't pass, they will be selected.

### Quests

// TODO: insert picture when UI is more finalised

You will be assigned daily quests which show you some tests you can run with specific parameters, and explain why you should run them. We currently only have one quest available, but more are on their way soon. All hosts on the network must pass the test to succeed the quest.

## Selection Panel

Shows information and actions related to the selected items on the graph. The button next to the host name in the top right of this panel allows you to open both views at once in a new tab. If more than one host is selected you can open each one in a new tab provided you have disabled pop-up blocking in your browser.

### Info View

// TODO: insert picture when UI is more finalised

When a host is selected, the connections list shows connections originating from that host. You can see the name of the process which created the connection, as well as its state.

### Actions View

// TODO: insert picture when UI is more finalised

Here you can interact directly with the selected host(s). Currently our actions can only run on the server itself and hosts with PowerShell remote access from the server, but we plan to expand this in the future. When you run an action, you will get a result, which sometimes contains further actions you can execute as a consequence of the initial one.