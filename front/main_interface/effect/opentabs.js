export default (state, action, send) => {
  let last_window
  action.nodes.forEach(v => {
    const viewer_tab = window.open('/node_viewer.html', '_blank')
    if (!viewer_tab) {
      const message = 'Opening multiple tabs was blocked by your browser! Please allow popups on this site.'
      if (last_window) last_window.alert(message)
      else alert(message)
      console.error(message)  
      return
    }
    last_window = viewer_tab
    viewer_tab.onload = () => {
      viewer_tab.send({type: 'node_data', data: state.nodes[v]})
      viewer_tab.send({type: 'parent_tab', tab: window})
      send({type: 'add_child_tab', tab: viewer_tab})
    }
    viewer_tab.onclose = () => {
      send({type: 'remove_child_tab', tab: viewer_tab})
    }
  })
} 