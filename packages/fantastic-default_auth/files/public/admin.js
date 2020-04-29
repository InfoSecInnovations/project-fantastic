function GetUser(form) {
  const data = new URLSearchParams()
  for (const pair of new FormData(form)) {
      data.append(pair[0], pair[1])
  }
  fetch('/admin/getuser', {
      method: 'post',
      body: data,
  })
  .then(res => res.json())
  .then(res => {
    const account_elm = document.getElementById('user_account')
    account_elm.innerHTML = ''
    if (res.error) {
      account_elm.appendChild(document.createTextNode(res.error))
      return
    }
    const username_div = document.createElement('div')
    username_div.appendChild(document.createTextNode(res.username))
    account_elm.appendChild(username_div)
    const role_div = document.createElement('div')
    role_div.appendChild(document.createTextNode(res.role))
    account_elm.appendChild(role_div)
  })

  return false
}