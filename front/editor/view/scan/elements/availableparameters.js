import {h} from 'snabbdom/h'

export default (state, label) =>  h('div.label', `${label ? `${label} ` : ''}Available variables from user parameters: ${(state.scan.json.parameters && state.scan.json.parameters.length && state.scan.json.parameters.map(parameter => `$${parameter.name}`).join(', ')) || ''}`)