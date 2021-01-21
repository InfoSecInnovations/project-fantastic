import Common from '@infosecinnovations/fantastic-front/effect'
import FlexSearch from '@infosecinnovations/fantastic-front/effect/flexsearch'
const FlatUnique = require('@infosecinnovations/fantastic-utils/flatunique')
import GenerateQuery from '@infosecinnovations/fantastic-front/effect/generatequery'
import Init from './init'
import OpenTabs from './opentabs'
import SearchQuery from './searchquery'
import RefreshNodes from './refreshnodes'
import Nodes from './nodes'
import UserHistory from './userhistory'
import NodesFromEdge from '../util/nodesfromedge'
import JsPlumb from './jsplumb'
import ResizeStory from './resizestory'
import StoryNode from './storynode'
import Quest from './quest'
import Test from './test'

export default (state, action, send) => {
  Common(state, action, send)
  FlexSearch(state, action, send)
  if (action.type == 'init') Init(state, send)
  if (action.type == 'nodes') Nodes(state, send)
  if (action.type == 'story_container') JsPlumb(state, action, send)
  if (action.type == 'get_nodes') RefreshNodes(send, {nodes: action.nodes, date: action.date, max_date: action.max_date})
  if (action.type == 'graph_container') {
    action.container.onmouseleave = e => send({type: 'hover_ui', value: true})
    action.container.onmouseenter = e => send({type: 'hover_ui', value: false})
  }
  if (action.type == 'search' || action.type == 'graph_container') RefreshNodes(send, SearchQuery(state))
  if (action.type == 'find_connections') {
    const node = state.selected.edge ? NodesFromEdge(state, state.selected.edge).from : state.nodes[state.selected.node]
    const connection = node.connections.find(v => v.connection_id == state.connection_search.expanded_connection)
    RefreshNodes(send, {
      ...SearchQuery(state),
      connection_local_ip: state.connection_search.local_ip ? connection.local_address : undefined,
      connection_remote_ip: state.connection_search.remote_ip ? connection.remote_address : undefined,
      connection_process: state.connection_search.process ? connection.process.id : undefined
    })
  }
  if (action.type == 'enable_command') fetch(`/commands?${GenerateQuery({[action.command]: action.enabled})}`, {method: 'POST'})
    .then(() => fetch('/commands'))    
    .then(res => res.json())
    .then(res => {
      send({type: 'commands', commands: res})
      send({type: 'command_loaded', command: action.command})
      UserHistory(send)
    })

  if (action.type == 'vis_select') state.vis.selectNodes(action.node !== undefined ? [action.node] : action.nodes)
  if (action.type == 'open_viewer') OpenTabs(state, action, send)
  if (action.type == 'click') {
    const valid = typeof action.node != 'undefined'
    if (valid) {
      if (state.keys.shift) {
        const nodes = FlatUnique([state.selected.nodes, state.selected.node, action.node])
        send({type: 'select', nodes})
        send({type: 'vis_select', nodes})
      }
      else send({type: 'select', node: action.node})
    }
    else send({...action, type: 'select'})
  }
  if (action.type == 'action_result' || action.type == 'action_followup_result') state.child_tabs.forEach(v => v.send(action))
  if (action.type == 'run_quest') fetch(`/quests?${GenerateQuery({quest: action.quest})}`, {method: 'POST'})
    .then(res => res.json())
    .then(res => Quest(state, send, action.quest, res))
  if (action.type == 'quest_results'){
    if (action.select) send({type: 'nodes', nodes: action.nodes || []})
    send({type: 'quest_nodes', quest: action.quest, nodes: action.nodes ? action.nodes.map(v => v.node_id) : []})
  }
  if (action.type == 'run_test') fetch(`/tests?${GenerateQuery({nodes: state.nodes.map(v => v.node_id), test: action.test})}`, {method: 'POST', body: JSON.stringify(action.parameters)})
    .then(res => res.json())
    .then(res => Test(state, send, action.test, action.parameters, res))
  if (action.type == 'favorite') fetch(`/favorites?${GenerateQuery({history_id: action.history_id, remove: action.remove})}`, {method: 'POST'})
    .then(res => res.json())
    .then(res => {
      send({type: 'user_history', history: res})
      send({type: 'favorite_result', history_id: action.history_id})
    })
  if (action.type == 'order_favorites') fetch(`/swap_favorites?${GenerateQuery({a: action.a, b: action.b})}`, {method: 'POST'})
    .then(res => res.json())
    .then(res => {
      send({type: 'user_history', history: res})
      send({type: 'favorites_ordered'})
    })
  if (action.type == 'post_review') fetch(`/review?${GenerateQuery({approved: action.approved, data_key: action.data_key, type: action.data_type, story_node: action.story_node})}`, {method: 'POST'})
    .then(res => res.json())
    .then(res => {
      send({...action, type: 'review_approval', approved: res.approved})
      send({type: 'review', results: undefined})
    })
  if (action.type == 'select_story') {
    if (action.story) {
      const storyData = state.stories[action.story]
      Object.entries(storyData.nodeData).forEach(
        node => node[1].targets.forEach(
          target => state.story.jsplumb.connect({source: node[0], target})
        )
      )
      ResizeStory(state, send)
    }
  }
  if (action.type == 'run_story_node') fetch(`/story_node?${GenerateQuery({story: action.story, node: action.node})}`, {method: 'POST'})
    .then(res => res.json())
    .then(res => StoryNode(state, send, action.story, action.node, res))
  if (action.type == 'story_results'){
    if (action.select) send({type: 'nodes', nodes: action.nodes || []})
    send({type: 'story_nodes', story: action.story, node: action.node, nodes: action.nodes ? action.nodes.map(v => v.node_id) : []})
  }
  if (action.type == 'test_resolve') {
    if (action.test) send({type: 'tab', tab: 'issues'})
  }
  if (action.type == 'select'){
    if (state.test_resolve) {
      send({type: 'test_resolve', test: null})
      send({type: 'tab', tab: 'info'})
    }
  } 
  if (action.type == 'run_test_resolve') fetch(`/test_resolve?${GenerateQuery({test_id: action.test_id})}`, {method: 'POST'})
    .then(res => res.json())
    .then(res => {
      if (res.data_type == 'quests') Quest(state, send, res.data_key, res)
      else if (res.data_type == 'stories') StoryNode(state, send, res.data_key, res.story_node, res)
      else Test(state, send, res.data_key, JSON.parse(res.parameters), res)
      send({type: 'test_resolve', test: null})
      send({type: 'tab', tab: 'info'})
    })

}