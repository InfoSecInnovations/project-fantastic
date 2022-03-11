import {h} from 'snabbdom/h'

export default (state, send) => [
  h('h2', 'Story Tree Editor'),
  h('div.item', [
    h('input', {
      attrs: { 
        id: 'load-file-input',
        type: 'file',
        accept: '.json'
      },
      on: { change: e => {
        send({type: 'load_tree', path: e.target.value}) 
        e.target.value = ''
      }},
      style: {display: 'none'}
    }),
    h('label.button', {attrs: {for: 'load-file-input'}}, 'Load story tree'),
    h('input', {
      attrs: { 
        id: 'save-file-input',
        type: 'file',
        nwsaveas: state.storyTree.saveFile || 'story.json',
        accept: '.json'
      },
      on: { change: e => {
        send({type: 'save', path: e.target.value}) 
        e.target.value = ''
      }},
      style: {display: 'none'}
    }),
    h('label.button', {attrs: {for: 'save-file-input'}}, 'Save story tree')
  ]),
  h('h2', state.storyTree.name || state.storyTree.filename)
]