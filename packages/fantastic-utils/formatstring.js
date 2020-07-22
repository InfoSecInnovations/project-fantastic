const formatString = (string, parameters) => {
  Object.entries(parameters).forEach(v => {
     // regex escape magic I found to preserve special characters when searching and replacing the key
     // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
    const key_regex = new RegExp(`$${v[0]}`.replace(/[.*+?^${}()|[\]\\]/g, '\\$&', 'g'))
    // TODO sanitize v[1] value to prevent injection
    let sanitized_value
    if (typeof v[1] == 'undefined') return
    if (typeof v[1] == 'number') sanitized_value = `${v[1]}`
    if (typeof v[1] == 'string') sanitized_value = `"${v[1]}"`
    if (typeof v[1] == 'boolean') sanitized_value = v[1] ? 'True' : 'False'
    string = string.replace(key_regex, sanitized_value)
  }) 
  return string
}

module.exports = formatString