const required_methods = [
  'configure',
  'initializeRoutes',
  'verify',
  'invalidate',
  'getByID',
  'getByUsername'
]

const getModule = base_module => {
  const missing = required_methods.filter(method => !base_module[method] || typeof base_module[method] !== 'function')
  if (missing.length) throw(`Authentication module is missing the following required functions: ${missing.join(', ')}`)
  return {
    ...base_module,
    initializeRoutes: async app => {
      await base_module.configure()
      return base_module.initializeRoutes(app)
    }
  }
}

module.exports = getModule