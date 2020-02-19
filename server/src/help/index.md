# Fantastic Help

Fantastic is a visual tool to explore a computer network, analyze security flaws, and help fix them.

## Quick Start

Once the server is up and running (see [Getting Started With The Server](starting_server.md)), connect to the server's address and port (the default is 5000) and you should be greeted by the application's interface.

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

A visual representation of the network. Each node represents a host, and the arrows show the connections between them. Clicking on a node or a connection opens the info panel where you can view more detailed information about it and perform actions if they are available.

## Host Data Commands

// TODO: insert picture when UI is more finalised

Here you can see all the available commands for getting data, and you can enable or disable them. Enabled commands will run constantly on the server and update the database.

## Info Panel

// TODO: insert picture when UI is more finalised

Shows information about the selected item on the graph. When a host is selected, the connections list shows connections originating from that host. You can see the name of the process which created the connection, as well as its state.