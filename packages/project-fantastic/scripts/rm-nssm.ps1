$nssmVersion = "nssm-2.24-101-g897c7ad"

# suppress the error if nssm isn't found
$oldPreference = $ErrorActionPreference
$ErrorActionPreference = 'SilentlyContinue'

$isInstalled = Get-Command nssm

# reinstate the user's preference after checking the installation
$ErrorActionPreference = $oldPreference

# we're going to assume that the command not being found is simply due to running this script from the same prompt as the start script (Path variable not refreshed yet)
if (-not $isInstalled) {
  Set-Alias -Name nssm -Value ("C:\Program Files\" + $nssmVersion + "\win64\nssm.exe")
}

$serviceName = "Fantastic"

nssm stop $serviceName
nssm remove $serviceName confirm