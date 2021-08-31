# Running Fantastic as a Service

- Make sure you have Fantastic installed.
- Navigate to the directory where you installed it.
- `npx fantastic-service` will start it. Depending on the authentication module you're using you may be required to peform some setup here. You have the following options regarding the account that owns the service:
    - **Currently logged in user**: This will just use the account you are currently logged in as, and won't require any additional setup on your part. A good way to test the service feature.
    - **Enter account credentials**: You can provide the username and password of the account that should run the service.
    - **Managed service account**: This is our preferred way of running Fantastic, managed accounts are a great, more secure way to run services. You will only have to input the account name as the password is managed automatically by this system. [See the official documentation for more information about Group Managed Service Accounts](https://docs.microsoft.com/en-us/windows-server/security/group-managed-service-accounts/group-managed-service-accounts-overview).

    Please bear in mind that Fantastic needs administrator privileges, so whichever account you use must be an admin. If using ActiveDirectory you must make sure to input the username exactly as expected by your domain, for example our test environment uses `domain\username`, just `username` won't work!
- To stop the service, just use `npx fantastic-rm-service`