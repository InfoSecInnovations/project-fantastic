const required_methods = [
  'configure',
  'initializeRoutes',
  'verify',
  'invalidate',
  'getByID',
  'getByUsername'
]

/**
 * Generate a Fantastic authentication module from a compatible package.
 * @param {{}} base_module 
 * @returns {{
 *  configure: () => Promise<void>,
 *  initializeRoutes: (app: {}) => Promise<void>,
 *  invalidate: (session_id: string) => Promise<void>,
 *  verify: (session_id: string) => Promise<import('@infosecinnovations/fantastic-utils/types').User>,
 *  getByID: (user_id: any) => Promise<import('@infosecinnovations/fantastic-utils/types').User>,
 *  getByUsername: (username: string) => Promise<import('@infosecinnovations/fantastic-utils/types').User>,
 *  serviceInit: (() => Promise<void>) | undefined,
 *  serviceRemove: (() => Promise<void>) | undefined
 * }}
 */
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