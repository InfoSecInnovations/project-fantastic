import jsPlumbDefaults from '@infosecinnovations/fantastic-front/effect/jsplumbdefaults'
const jsPlumb = require('@jsplumb/community')

export default (state, action, send) => jsPlumb.ready(() => {
  const instance = jsPlumb.newInstance({
    ...jsPlumbDefaults,
    endpoint: ['Dot', {radius: 10}],
    endpointStyle: {fill: 'rgb(80, 81, 81)'},
    container: action.id
  })
  send({type: 'editor_jsplumb', instance})
  // prevent duplicate connections
  instance.bind('beforeDrop', info => !instance.select({source: info.sourceId, target: info.targetId}).length) 
  // if we establish a new connection flowing the opposite way to an existing one we should remove the existing one
  instance.bind('connection', info => instance.select({source: info.targetId, target: info.sourceId}).deleteAll())
  // prevent dragging outside the canvas      
  instance.bind('drag:move', info => {
    const parentRect = instance.getContainer().getBoundingClientRect()
    const childRect = info.el.getBoundingClientRect()
    if (childRect.right > parentRect.right) info.el.style.left = `${parentRect.width - childRect.width}px`
    if (childRect.left < parentRect.left) info.el.style.left = '0px'
    if (childRect.top < parentRect.top) info.el.style.top = '0px'
    if (childRect.bottom > parentRect.bottom) info.el.style.top = `${parentRect.height - childRect.height}px`
  })
})