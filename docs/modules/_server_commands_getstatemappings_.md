**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "server/commands/getstatemappings"

# Module: "server/commands/getstatemappings"

## Index

### Variables

* [FS](_server_commands_getstatemappings_.md#fs)
* [RunPowerShell](_server_commands_getstatemappings_.md#runpowershell)
* [states](_server_commands_getstatemappings_.md#states)

### Functions

* [getStateMappings](_server_commands_getstatemappings_.md#getstatemappings)

## Variables

### FS

• `Const` **FS**: "fs/promises" = require('fs').promises

*Defined in [server/commands/getstatemappings.js:2](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/commands/getstatemappings.js#L2)*

___

### RunPowerShell

• `Const` **RunPowerShell**: [child](_packages_fantastic_cli_runpowershell_.md#child) = require('fantastic-cli/runpowershell')

*Defined in [server/commands/getstatemappings.js:1](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/commands/getstatemappings.js#L1)*

___

### states

• `Const` **states**: string[] = [ "Bound", "Closed", "CloseWait", "Closing", "DeleteTCB", "Established", "FinWait1", "FinWait2", "LastAck", "Listen", "SynReceived", "SynSent", "TimeWait" ]

*Defined in [server/commands/getstatemappings.js:4](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/commands/getstatemappings.js#L4)*

## Functions

### getStateMappings

▸ `Const`**getStateMappings**(): Promise\<void>

*Defined in [server/commands/getstatemappings.js:23](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/commands/getstatemappings.js#L23)*

 write the mapping for each state number from Get-NetTcpConnection to a file until we know all the states

**Returns:** Promise\<void>
