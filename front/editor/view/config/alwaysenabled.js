import CommandList from './commandlist'

export default (state, send) => CommandList(state, send, state.config.json.assets.force_commands, 'Always enabled', 'config_always_enabled', 'config_always_enable', 'config_remove_always_enabled')