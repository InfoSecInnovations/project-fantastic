fetch('/auth/myaccount')
.then(res => res.json())
.then(res => {
  document.getElementById('username').innerHTML = res.username
  document.getElementById('role').innerHTML = `Role: ${res.role}`
})