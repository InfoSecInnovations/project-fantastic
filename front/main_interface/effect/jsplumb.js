const jsPlumb = require('@jsplumb/community')
import jsPlumbDefaults from '@infosecinnovations/fantastic-front/effect/jsplumbdefaults'

export default (state, action, send) => jsPlumb.ready(() => {
  const instance = jsPlumb.newInstance({
    ...jsPlumbDefaults,
    endpoint: 'Blank',
    container: action.id,
    elementsDraggable: false
  })
  send({type: 'jsplumb', instance})
})