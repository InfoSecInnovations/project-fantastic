const getModule = base_module => {
  // TODO: verify required fields on base module
  return {
    ...base_module,
    initializeRoutes: async app => {
      await base_module.configure()
      return base_module.initializeRoutes(app)
    }
  }
}

module.exports = getModule