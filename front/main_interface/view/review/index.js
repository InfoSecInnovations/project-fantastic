import {h} from 'snabbdom/h'
import NodeName from '@infosecinnovations/fantastic-front/util/nodename'
import ReviewIcon from '@infosecinnovations/fantastic-front/view/reviewicon'

export default (state, send) => {
  if (!state.review) return
  const {type: data_type, name: data_key, filter} = state.review
  const test = data_type == 'stories' ? state.stories[data_key].nodeData[state.review.story_node].key : data_key
  return h('div#review', h('div.panel', h('div.scroll_container', [
    h('h2', `Please check results from ${state.tests[test].name}`),
    filter !== 'none' ? h(
      'div.button', 
      {on: {click: [send, {type: 'review_filter', mode: filter === 'fail' ? 'all' : 'fail'}]}}, 
      filter === 'fail' ? 'Show all' : 'Show results needing manual approval'
    ) : undefined,
    h(
      'div.results scroll', 
      {
        on: {scroll: e => e.target.style.setProperty("--review-scroll-height", `-${e.target.scrollTop}px`)} // there doesn't seem to be a good CSS solution to make a tooltip follow the scrollable area but display over it, so we need to set this variable
      },
      state.review.results.map(v => {
        const node = state.nodes.find(n => n.node_id === v.node_id)
        return h('div.result scroll_item spaced', [
          h('div.header', [
            h('h3', node ? NodeName(node) : `Node ID: ${v.node_id}`), 
            h(`div.foldout fas fa-${state.review.foldouts[v.node_id] ? 'chevron-down' : 'chevron-right'}`, {on: {click: [send, {type: 'review_foldout', node_id: v.node_id, value: !state.review.foldouts[v.node_id]}]}})
          ]),
          ...(state.review.foldouts[v.node_id] ? v.result.filter(r => filter !== 'fail' ? true : !r.pass).map(r => h('div', [
            h('div.item', [
              h('h4', r.label),
              ReviewIcon(
                filter === 'none' ? 'none' 
                : r.pass ? 'pass' 
                : 'fail',
                state.actions[v.action].filters.run
              ) 
            ]),
            ...(r.data ? r.data.map(d => h('div', d)) : [])
          ])) : [])
        ])
      })
    ),
    h('div.buttons', [
      h('div.button', {
        class: {disabled: state.review.loading},
        on: state.review.loading ? {} : {click: [send, {type: 'post_review', approved: true, data_key, data_type, story_node: state.review.story_node}]}
      }, 'Everything looks OK'),
      h('div.button', {
        class: {disabled: state.review.loading},
        on: state.review.loading ? {} : {click: [send, {type: 'post_review', approved: false, data_key, data_type, story_node: state.review.story_node}]}
      }, "Something's not right")
    ])
  ])))
}