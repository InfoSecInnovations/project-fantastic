fetch('/auth/myaccount')
.then(res => res.json())
.then(res => {
  if (res.error) return document.getElementById('content').innerHTML = res.error
  document.getElementById('username').innerHTML = res.username
  document.getElementById('role').innerHTML = `Role: ${res.role}`
})