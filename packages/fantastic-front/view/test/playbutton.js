import {h} from 'snabbdom/h'

/**
 * @param {{} | string} button_data
 * @param {{}} [editor]
 */
export default (button_data, editor) => button_data == 'loading' ?
  [h('div.play button disabled', 'Gathering results...')] :
  [
    editor,
    h('div.play button', button_data, [
      'Start',
      h('span.fas fa-play')
    ])
  ]