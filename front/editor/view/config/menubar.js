import {h} from 'snabbdom/h'

export default (state, send) => [
  h('h2', 'Config Editor'),
  h('div.item', [
    h('input', {
      attrs: { 
        id: 'load-file-input',
        type: 'file',
        accept: '.json'
      },
      on: { change: e => {
        send({type: 'load_config', path: e.target.value}) 
        e.target.value = ''
      }},
      style: {display: 'none'}
    }),
    h('label.button', {attrs: {for: 'load-file-input'}}, 'Load config file'),
    h('input', {
      attrs: { 
        id: 'save-file-input',
        type: 'file',
        nwsaveas: state.config.saveFile || 'config.json',
        accept: '.json'
      },
      on: { change: e => {
        send({type: 'save_config', path: e.target.value}) 
        e.target.value = ''
      }},
      style: {display: 'none'}
    }),
    h('label.button', {attrs: {for: 'save-file-input'}}, 'Save config file')
  ])
]