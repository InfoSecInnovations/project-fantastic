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

$serviceName = "Fantastic Test Service"
$nodePath = "C:\Program Files\nodejs\node.exe"
$serviceDir = Get-Location
nssm install $serviceName $nodePath .\node_modules\@infosecinnovations\project-fantastic\index.js
nssm set $serviceName AppDirectory $serviceDir
nssm start $serviceName
