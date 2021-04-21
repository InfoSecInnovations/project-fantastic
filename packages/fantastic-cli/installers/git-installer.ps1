
### get latest version info (download path and filename for 64 bit version)
$githubLatestReleases = "https://api.github.com/repos/git-for-windows/git/releases/latest"   
$JSONResponse = (Invoke-WebRequest $gitHubLatestReleases -UseBasicParsing)
[string]$URI = (($JSONResponse | ConvertFrom-Json).assets.browser_download_url | Select-String "-64-bit.exe")
[string]$Filename = (($JSONResponse | ConvertFrom-Json).assets.name | Select-String "-64-bit.exe")


### download the file
$DownloadFile = $env:TEMP + '\' + $Filename
Invoke-WebRequest -Uri $URI -OutFile $DownloadFile -UseBasicParsing


### Install Git
# based on work from:
# https://github.com/Limech/git-powershell-silent-install
$logFile = $env:TEMP + "\Git-install-" + $timestamp + ".log"
$commandLineOptions = '/SP- /VERYSILENT /SUPPRESSMSGBOXES /FORCECLOSEAPPLICATIONS /LOG="' + $logFile + '"'

Start-Process -Wait -FilePath $DownloadFile -ArgumentList $commandLineOptions


### Configure git with some defaults
# Set git as a command alias
if (!(Test-Path -Path "alias:git")) 
{
   new-item -path alias:git -value 'C:\Program Files\Git\bin\git.exe'
}
### Invoke git commands that set defaults for user.
git config --global credential.helper wincred
git config --global push.default simple
git config --global core.autocrlf true
