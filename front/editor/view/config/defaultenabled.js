import CommandList from './commandlist'

export default (state, send) => CommandList(state, send, state.config.json.assets.default_enable_commands, 'Enabled by default', 'config_default_enabled', 'config_default_enable', 'config_remove_default_enabled')