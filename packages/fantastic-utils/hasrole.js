const hasRole = (user, role) => {
  if (!user) return false
  if (user.role === 'admin') return true
  if (user.role === 'privileged' && role !== 'admin') return true 
  return user.role === (role || 'user')
}

module.exports = hasRole