const getConfig = (user, res, req, query, config) => {
  res.end(JSON.stringify(config.client))
}

module.exports = getConfig