const ipAddress = (ip, port) => `${(ip.includes(':') ? `[${ip}]` : ip)}:${port}`

module.exports = ipAddress