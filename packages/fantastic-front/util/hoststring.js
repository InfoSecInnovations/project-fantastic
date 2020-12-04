export default host => {
  if (host == 'local') return 'local host'
  if (host == 'remote') return 'host with PowerShell remote access'
}