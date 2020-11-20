const getUser = (user, res, req, query) => res.end(JSON.stringify({username: user.username, role: user.role}))

module.exports = getUser