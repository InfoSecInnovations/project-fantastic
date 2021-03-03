import {h} from 'snabbdom/h'
import LogHeader from '@infosecinnovations/fantastic-front/view/history/logheader'
import SaveButton from '@infosecinnovations/fantastic-front/view/savebutton'
import NodeName from '@infosecinnovations/fantastic-front/util/nodename'

const log_content = (state, log) => {
  if (log.event_type == 'scan' && log.parameters) {
    const parameters = JSON.parse(log.parameters)
    if (!Object.keys(parameters).length) return []
    return [
      'Parameters used:',
      h('ul', Object.entries(parameters).map(v => h('li', `${v[0]}: ${v[1]}`)))
    ]
  }
  if (log.event_type == 'command') {
    return log.status ? ['Enabled'] : ['Disabled']
  }
  if (log.event_type == 'action') {
    const node = state.nodes.find(v => v.node_id == log.node_id)
    if (node) return [`Target: ${NodeName(node)}`]
    return `Target: Node ${log.node_id}`
  }
  return []
}

const history_item_controls = (state, send, item) => h('div.history_controls', [
  SaveButton(state, send, item),
  h('span.fas fa-redo-alt fa-fw history_control', {on: {click: () => {
    if (item.event_type == 'scan') {
      send({type: 'run_scan', scan: item.scan, parameters: item.parameters && JSON.parse(item.parameters)})
      send({type: 'select_item', item: item.scan, panel: 'scans', parameters: item.parameters && JSON.parse(item.parameters)})
    }
    if (item.event_type == 'quest') {
      send({type: 'run_scan', scan: item.quest, parameters: item.parameters && JSON.parse(item.parameters)})
      send({type: 'select_item', item: item.quest, panel: 'scans', parameters: item.parameters && JSON.parse(item.parameters)})
    }
    if (item.event_type == 'command') {
      send({type: 'enable_command', command: item.command, enabled: item.status ? true : false})
      send({type: 'select_item', item: item.command, panel: 'host_data'})
    }
    if (item.event_type == 'story') {
      const scan = state.stories[item.story].nodeData[item.story_node_id].key
      send({type: 'run_scan', scan, parameters: item.parameters && JSON.parse(item.parameters)})
      send({type: 'left_panel_state', state: 'scans', scan, parameters: item.parameters && JSON.parse(item.parameters)})
    }
    if (item.event_type == 'action') {
      const node_id = state.nodes.findIndex(v => v.node_id == item.node_id)
      if (node_id != -1) {
        const node = state.nodes[node_id]
        send({type: 'perform_action', action: item.action, node_id: node.node_id, host: node.hostname})
        send({type: 'select', node: node_id})
        send({type: 'vis_select', node: node_id})
        send({type: 'select_item', item: item.action, panel: 'actions'})
      }
    }
  }}})
])

const getScanItem = (state, item) => {
  if (item.event_type == 'quest') return {...item, event_type: 'scan', scan: item.quest}
  if (item.event_type == 'story') return {...item, event_type: 'scan', scan: state.stories[item.story].nodeData[item.story_node_id].key}
  return item
}

const log_header = (state, send, item) => h('h4.link', {on: {click: e => {
  if (item.event_type == 'scan') {
    if (item.parameters) {
      Object.entries(JSON.parse(item.parameters)).forEach(v => send({type: 'scan_parameter', scan: item.scan, key: v[0], value: v[1]}))
    }
    send({type: 'select_item', item: item.scan, panel: 'scans'})
  }
  if (item.event_type == 'command') send({type: 'select_item', item: item.command, panel: 'host_data'})
  if (item.event_type == 'action') {
    const node = state.nodes.findIndex(v => v.node_id == item.node_id)
    if (node != -1) {
      send({type: 'select', node})
      send({type: 'vis_select', node})
      send({type: 'select_item', item: item.action, panel: 'actions'})
    }
  }
}}}, LogHeader(state, item))

const saved = (state, send) => {
  if (!state.history.saved.length) return []
  return [ 
    h('h2.panel_title', 'Saved Workflows'),
    h('div.scroll', state.history.ordering ?
      h('h3.scroll_item waiting', 'Please wait...') :
      state.history.saved.map((v, i) => {
        // we want to show the scan from the saved quest
        const item = getScanItem(state, v)
        return h('div.scroll_item', {
          attrs: {draggable: 'true'}, // draggable won't work unless it's a string with the value "true"
          on: {
            dragstart: e => e.dataTransfer.setData('text/plain', i),
            drop: e => {
              e.preventDefault() // preventDefault stops other events interfering with drag and drop
              send({type: 'order_saved', a: v.saved_id, b: state.history.saved[parseInt(e.dataTransfer.getData('text/plain'))].saved_id})
            },
            dragover: e => {
              e.preventDefault()
              e.dataTransfer.dropEffect = 'move'
            }
          }
        }, [
          h('div.history_title', [
            history_item_controls(state, send, v),
            log_header(state, send, item)
          ]),
          ...log_content(state, item)
        ])
      })
    )
  ]
}

const context = (state, item) => {
  if (item.event_type == 'scan' || item.event_type == 'action') return
  return h('div', `Invoked by ${LogHeader(state, item)}`)
}

const history = (state, send) => {
  if (!state.history.results.length) return [
    h('h3.panel_title', 'Run scans, complete quests or toggle host data commands to see something here!')
  ]
  return [
    h('h2.panel_title', 'History'),
    h('div.scroll', state.history.results.map(v => {
      const item = getScanItem(state, v)
      return h('div.scroll_item', [
        h('div.history_title', [
          history_item_controls(state, send, v),
          log_header(state, send, item)
        ]),
        context(state, v),
        ...log_content(state, item)
      ])
    }))
  ]
}

export default (state, send) => h('div.scroll_container', [
  ...saved(state, send),
  ...history(state, send)
])