fetch('/auth/myaccount')
.then(res => res.json())
.then(res => {
  if (res.error) return document.getElementById('content').innerHTML = res.error
  document.getElementById('username').innerHTML = res.username
  document.getElementById('role').innerHTML = `Role: ${res.role}`
})

document.onkeyup = e => {
  if (e.key == 'Enter') document.getElementById('continue').click()
}

function deleteButton(button){
  const parent = button.parentElement
  parent.removeChild(button)
  const confirm = parent.appendChild(document.createElement('div'))
  confirm.className = 'confirm'
  confirm.appendChild(document.createTextNode('Really delete your account?'))
  const yes = parent.appendChild(document.createElement('div'))
  yes.className = 'button'
  yes.appendChild(document.createTextNode('Yes'))
  yes.onclick = e => {
    fetch('/auth/deleteaccount', {method: 'post', redirect: 'follow'})
    .then(res => window.open(res.url, '_self'))
  }
  const no = parent.appendChild(document.createElement('div'))
  no.className = 'button'
  no.appendChild(document.createTextNode('No'))
  no.onclick = e => {
    parent.removeChild(confirm)
    parent.removeChild(yes)
    parent.removeChild(no)
    parent.appendChild(button)
  }
}