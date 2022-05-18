import {h} from 'snabbdom/h'

export default (state, label) =>  h('div.label', `${label || ''} ${(state.scan.json.parameters && state.scan.json.parameters.length && `Available variables from user parameters: ${state.scan.json.parameters.map(parameter => `$${parameter.name}`).join(', ')}`) || ''}`)