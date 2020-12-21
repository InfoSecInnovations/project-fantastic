const jsPlumb = require('@jsplumb/community')
import jsPlumbDefaults from '@infosecinnovations/fantastic-front/effect/jsplumbdefaults'
import ResizeStory from './resizestory'

export default (state, action, send) => jsPlumb.ready(() => {
  const instance = jsPlumb.newInstance({
    ...jsPlumbDefaults,
    endpoint: 'Blank',
    container: action.elm.id,
    elementsDraggable: false
  })
  send({type: 'jsplumb', instance})
  ResizeStory(state, send)
})