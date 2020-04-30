const create = (tag, text) => {
  const elm = document.createElement(tag)
  elm.appendChild(document.createTextNode(text))
  return elm
}

const create_option = (text, value, selected) => {
  const elm = create('option', text)
  elm.setAttribute('value', value)
  if (selected) elm.setAttribute('selected', "")
  return elm
}

let state = {}

const render = state => {
  const account_elm = document.getElementById('user_account')
  account_elm.innerHTML = ''
  if (state.error) {
    account_elm.appendChild(create('div', state.error))
    return
  }
  const table = account_elm.appendChild(document.createElement('table'))
  const thead = table.appendChild(document.createElement('thead'))
  const head_row = thead.appendChild(document.createElement('tr'))
  head_row.appendChild(create('th', 'username'))
  head_row.appendChild(create('th', 'role'))
  const tbody = table.appendChild(document.createElement('tbody'))
  const row = tbody.appendChild(document.createElement('tr'))
  row.appendChild(create('td', state.username))
  const role_cell = row.appendChild(document.createElement('td')).appendChild(document.createElement('div'))
  role_cell.className = 'table_cell'
  role_cell.appendChild(create('div', state.role))
  const change_div = role_cell.appendChild(document.createElement('div'))
  change_div.className = 'change'
  const change_button = change_div.appendChild(create('div', 'Change'))
  change_button.className = 'button'
  if (state.loading) change_button.classList.add('disabled')
  change_button.onclick = () => {
    state.change_role = !state.change_role
    render(state)
  }
  if (state.change_role) {
    const dropdown = change_div.appendChild(document.createElement('select'))
    dropdown.className = 'dropdown'
    ;['user', 'privileged', 'admin'].forEach(v => dropdown.appendChild(create_option(v, v, state.role === v)))
    dropdown.onchange = e => {
      state.loading = true
      state.change_role = false
      render(state)
      fetch('/admin/changerole', {
        method: 'post',
        body: JSON.stringify({username: state.username, role: e.target.value}),
      })
      .then(res => res.json())
      .then(res => {
        state = {...state, ...res, loading: false}
        render(state)
      })
    }
  }
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
    state = {...state, ...res}
    render(state)
  })

  return false
}