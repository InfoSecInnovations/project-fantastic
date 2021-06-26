# Fantastic ActiveDirectory Authentication Module

If you wish to use ActiveDirectory accounts with Fantastic instead of the default account system.

You will need:
- an AD group for regular users.
- an AD group for elevated users.
- an AD group for admin users.
- an AD account which has permission to know which group a user is in.
- a Fantastic installation using the `@infosecinnovations/fantastic-active_directory` module for authentication. We currently don't have an automated installer for this, so if you didn't select this module during the initial install, you have to npm install it, and set it as the authentication module in `config.json`.

During installation, or when first launching Fantastic if you manually installed the module, you will be prompted to input the domain controller URL and base DN as well group names of the groups you created above. 

Every time you start the Fantastic server it will ask you to input the credentials of the account used to check the user's group. You must enter the username in the exact format expected by the domain, in our case it's `username\domain.local` some domains might use `username@domain.local`, otherwise login will fail.

You or someone with the necessary privileges must add any AD users who are allowed to use Fantastic to the relevant groups, note that the account used by Fantastic will not work as a user account unless also added to a group.

When you go to the client you should be greeted by a login screen asking for your AD credentials. Much like the Fantastic user, you must use the exact name formatting specified by the domain.