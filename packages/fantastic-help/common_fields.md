# Common Fields

These items appear on all the types of Fantastic data item.

## name

*Optional*

This is the name displayed in the interface. If no name is provided it will default to the key in the package object.

## description

*Optional*

This description should inform the user about the command.

## role

*Optional*

Values can be `elevated` or `admin`, if no role is specified the action will be available to all users.

## hosts

The access levels required to run this command on a host. This is an array.

- `local` - this command can run on the server machine
- `remote` - this command can run on any machine with PowerShell remote access from the server.
- `none` - this command can target any machine on the network (not supported yet)