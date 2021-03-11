const connectionPagination = connection_limit => connection_limit && {
  page: 0,
  page_size: connection_limit
}

module.exports = connectionPagination