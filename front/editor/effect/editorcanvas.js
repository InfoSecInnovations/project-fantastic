import jsPlumbDefaults from './jsplumbdefaults'
const jsPlumb = require('@jsplumb/community')

export default (state, action, send) => jsPlumb.ready(() => {
  const instance = jsPlumb.newInstance({
    ...jsPlumbDefaults,
    endpoint: ['Dot', {radius: 10}],
    endpointStyle: {fill: 'rgb(80, 81, 81)'},
    container: action.id
  })
  send({type: 'editor_jsplumb', instance})
})