const cookie_value = cookie_name => document.cookie.replace(new RegExp(`(?:(?:^|.*;\s*)${cookie_name}\s*\=\s*([^;]*).*$)|^.*$`), "$1")

window.onload = () => {
  const error_cookie = cookie_value('error')
  if (error_cookie) {
    document.getElementById('error').innerHTML = error_cookie
    document.cookie = "error=; path=/auth"
  }
}

