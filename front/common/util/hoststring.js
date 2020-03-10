const hostString = host => {
  if (host == 'local') return 'local host'
  if (host == 'remote') return 'host with PowerShell remote access'
}

module.exports = hostString