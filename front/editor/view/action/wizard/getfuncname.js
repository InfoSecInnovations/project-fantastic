export default state => state.action.wizard.funcName == 'run' ? 'Run (entry point)' : (state.action.json.functions[state.action.wizard.funcName].name || state.action.wizard.funcName)