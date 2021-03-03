import {h} from 'snabbdom/h'
const CompareEvent = require('@infosecinnovations/fantastic-utils/compareevent')

const get_status = (state, item) => {
  if (state.history.waiting.some(v => CompareEvent(state.stories, state.history.saved.find(h => h.history_id == v) || state.history.results.find(h => h.history_id == v), item))) return 'waiting'
  if (state.history.saved.some(v => CompareEvent(state.stories, v, item))) return 'saved'
}

const click_event = (send, item, status) => () => send({type: 'save', remove: status == 'saved', history_id: item.history_id})

const button = (send, item, status, small) => status == 'waiting' ? 
  h('span.fas fa-ellipsis-h fa-fw waiting', {class: {history_control: small}}) :
  h('span.fas fa-save fa-fw', {
    on: {click: click_event(send, item, status)},
    class: {favorited: status == 'saved', history_control: small}
  })

export default (state, send, item, text) => {
  if (!item) return
  const status = get_status(state, item)
  return text ?
    h('div.play button', {
      on: {click: click_event(send, item, status)},
      class: {disabled: status == 'waiting'}
    }, [
      status == 'saved' ? 'Workflow saved' : 'Save this workflow',
      button(send, item, status)
    ]) :
    button(send, item, status, true)
} 