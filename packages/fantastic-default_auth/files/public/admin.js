const create = (tag, text) => {
  const elm = document.createElement(tag)
  elm.appendChild(document.createTextNode(text))
  return elm
}

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
      account_elm.appendChild(create('div', res.error))
      return
    }
    const table = account_elm.appendChild(document.createElement('table'))
    const thead = table.appendChild(document.createElement('thead'))
    const head_row = thead.appendChild(document.createElement('tr'))
    head_row.appendChild(create('th', 'username'))
    head_row.appendChild(create('th', 'role'))
    const tbody = table.appendChild(document.createElement('tbody'))
    const row = tbody.appendChild(document.createElement('tr'))
    row.appendChild(create('td', res.username))
    row.appendChild(create('td', res.role))
  })

  return false
}