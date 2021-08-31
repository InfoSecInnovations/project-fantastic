Write-Host "Launching Fantastic service using NSSM..."

# suppress the error if nssm isn't installed
$oldPreference = $ErrorActionPreference
$ErrorActionPreference = 'SilentlyContinue'

$isInstalled = Get-Command nssm

# reinstate the user's preference after checking the installation
$ErrorActionPreference = $oldPreference

if (-not $isInstalled) {
  Write-Host "NSSM not detected on this machine, installing..."
  $nssmVersion = "nssm-2.24-101-g897c7ad"
  $nssmUrl = "https://nssm.cc/ci/" + $nssmVersion + ".zip"
  $Filename = "nssm-download.zip"

  ### download the file
  $DownloadFile = $env:TEMP + '\' + $Filename
  Invoke-WebRequest -URI $nssmUrl -OutFile $DownloadFile -UseBasicParsing

  ### extract it
  Expand-Archive -LiteralPath $DownloadFile -DestinationPath "C:\Program Files" -Force
  
  ### add to path
  $env:Path = $env:Path + ";C:\Program Files\" + $nssmVersion + "\win64"
  [Environment]::SetEnvironmentVariable("Path", $env:Path, "Machine")
}

### create service
$serviceName = "Fantastic"
$nodePath = "C:\Program Files\nodejs\node.exe"
$serviceDir = Get-Location
nssm install $serviceName $nodePath .\node_modules\@infosecinnovations\project-fantastic\index.js
nssm set $serviceName AppDirectory $serviceDir

### get account options
[int]$accountOption = 0
while ($accountOption -lt 1 -or $accountOption -gt 3) {
  $accountOption = Read-Host "Which account will run the service?
1 - Currently logged in user
2 - Enter account credentials
3 - Managed service account
"
}
if ($accountOption -eq 2) {
  $username = Read-Host "Service account username"
  $password = Read-Host "Service account password" -MaskInput
  nssm set $serviceName ObjectName $username $password
}
if ($accountOption -eq 3) {
  $username = Read-Host "Managed Service Account name"
  if (-not $username.EndsWith('$')) {
    $username = $username + '$'
  }
  nssm set $serviceName ObjectName $username " "
}

### launch the service
nssm start $serviceName
