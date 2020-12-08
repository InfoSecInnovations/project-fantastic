export default (state, action) => {
  if (action.type == 'mode') state.mode = action.mode
  if (action.type == 'editor_jsplumb') state.editor.jsplumb = action.instance
  if (action.type == 'load_module_menu') state.module_menu = action.enabled
  if (action.type == 'module_names') state.available_modules = action.files
  if (action.type == 'add_module') state.modules.push(action.module)
  return state
}