import jsPlumbDefaults from './jsplumbdefaults'
const jsPlumb = require('@jsplumb/community')
const FS = require('fs-extra')
const Path = require('path')
import LoadModule from './loadmodule'

export default (state, action, send) => {
  if (action.type == 'init') {
    FS.readdir(Path.join(process.cwd(), '../packages'))
    .then(files => Promise.all( // TODO: this filtering is a bit sucky!
      files
      .filter(file => file != 'project-fantastic')
      .map(
        file => FS.readdir(Path.join(process.cwd(), '../packages', file))
        .then(files => ({file, valid: files.some(f => f == 'actions' || f == 'tests')}))
      )
    ))
    .then(files => send({
      type: 'module_names', 
      files: files.filter(file => file.valid).map(file => file.file)
    }))
  }
  if (action.type == 'editor_canvas') {
    jsPlumb.ready(() => {
      const instance = jsPlumb.newInstance({
        ...jsPlumbDefaults,
        endpoint: ['Dot', {radius: 10}],
        endpointStyle: {fill: 'rgb(80, 81, 81)'},
        container: action.id
      })
      send({type: 'editor_jsplumb', instance})
    })
  }
  if (action.type == 'load_module') {
    send({type: 'load_module_menu', enabled: false})
    LoadModule(state, action, send)
  }
}