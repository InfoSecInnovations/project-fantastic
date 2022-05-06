import {h} from 'snabbdom/h'

const timeKeys = [
  'd',
  'h',
  'm',
  's'
]

export default (state, send) => [
  h('div', [
    h('h4', 'Host Selection'),
    h('div.label', 'Unlike running a scan which operates on the current selection, daily quests will search all known hosts using the criteria below.')
  ]),
  h('div', [
    h('div', 'Time last seen'),
    h('div.label', 'How far back in time do we look for host data? If you put something too big here, you run the risk of scanning a very large amount of data!')
  ]),
  h('div.row', timeKeys.map(unit => h('div.row', [
    h('div.label', {attrs: {for: `${state.scan.filename}-scan-quest-selection-${unit}`}}, unit),
    h('input', {
      attrs: {
        id: `${state.scan.filename}-scan-quest-selection-${unit}`,
        type: 'number',
        min: 0
      },
      props: {
        value: state.scan.json.quest.selection.age[unit] || 0
      },
      on: {input: e => send({type: 'scan_quest_selection_time', unit, value: parseInt(e.target.value)})},
    })
  ])))
]