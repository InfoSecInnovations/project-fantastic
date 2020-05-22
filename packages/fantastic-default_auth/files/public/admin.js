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

const create_button = (text, onclick) => {
  const button = create('div', text)
  button.className = 'button'
  button.onclick = onclick
  return button
}

let state = {data: {}}

const update = func => {
  state.loading = true
  render(state)
  func()
  .then(res => res.text())
  .then(res => res.length ? JSON.parse(res) : {})
  .then(res => {
    state = {data: res, loading: false, confirm: false}
    render(state)
  })
}

const render = state => {
  const account_elm = document.getElementById('user_account')
  account_elm.innerHTML = ''
  if (state.data.error) {
    const error = account_elm.appendChild(create('div', state.data.error))
    error.className = 'error'
    return
  }
  if (!Object.keys(state.data).length) return
  const table = account_elm.appendChild(document.createElement('table'))
  const thead = table.appendChild(document.createElement('thead'))
  const head_row = thead.appendChild(document.createElement('tr'))
  head_row.appendChild(create('th', 'username'))
  head_row.appendChild(create('th', 'role'))
  head_row.appendChild(create('th', 'delete'))
  const tbody = table.appendChild(document.createElement('tbody'))
  const row = tbody.appendChild(document.createElement('tr'))
  row.appendChild(create('td', state.data.username))
  const dropdown = row.appendChild(document.createElement('td')).appendChild(document.createElement('select'))
  if (state.loading) dropdown.setAttribute('disabled', "")
  dropdown.className = 'dropdown'
  ;['user', 'elevated', 'admin'].forEach(v => dropdown.appendChild(create_option(v, v, state.data.role === v)))
  dropdown.onchange = e => update(() => fetch('/auth/admin/changerole', {
    method: 'post',
    body: JSON.stringify({username: state.data.username, role: e.target.value}),
  }))
  if (state.confirm) {
    const cell = row.appendChild(document.createElement('td'))
    cell.appendChild(create('div', `delete ${state.data.username}?`))
    const buttons = cell.appendChild(document.createElement('div'))
    buttons.className = 'table_cell'
    buttons.appendChild(
      create_button('Yes', e => 
        update(() => fetch('/auth/admin/deleteaccount', {
          method: 'post',
          body: state.data.username
        }))
      )
    )
    buttons.appendChild(create_button('No', e => {
      state.confirm = false
      render(state)
    }))
  }
  else {
    const delete_button = row.appendChild(document.createElement('td')).appendChild(create('div', 'Delete'))
    delete_button.className = 'button'
    delete_button.onclick = e => {
      state.confirm = true
      render(state)
    }
  }
}

function GetUser(form) {
  update(() => {
    const data = new URLSearchParams()
    for (const pair of new FormData(form)) {
      data.append(pair[0], pair[1])
    }
    return fetch('/auth/admin/getuser', {
      method: 'post',
      body: data,
    })
  })
  return false
}