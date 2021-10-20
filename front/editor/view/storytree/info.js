import QuestConfig from './questconfig'
import NodeInfo from './nodeinfo'

export default (state, send) => state.storyTree.selected ? NodeInfo(state, send, state.storyTree.selected) : QuestConfig(state, send)