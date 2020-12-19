import QuestConfig from './questconfig'
import NodeInfo from './nodeinfo'

export default (state, send) => state.editor.selected ? NodeInfo(state, send, state.editor.selected) : QuestConfig(state, send)