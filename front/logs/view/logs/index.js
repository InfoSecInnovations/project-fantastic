import {h} from 'snabbdom/h'
const Log = require('./log')

const logs = (state, send) => h('div', state.logs.map(v => Log(state, send, v)))

module.exports = logs