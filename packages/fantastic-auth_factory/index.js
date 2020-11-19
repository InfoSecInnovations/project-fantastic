const getModule = base_module => {
  return {
    ...base_module,
    initializeRoutes: async app => {
      await base_module.configure()
      base_module.initializeRoutes(app)
    }
  }
}

module.exports = getModule