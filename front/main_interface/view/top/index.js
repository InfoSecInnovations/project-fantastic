import {h} from 'snabbdom/h'
import Search from './search'
const HasRole = require('@infosecinnovations/fantastic-utils/hasrole')

const link = (url, target, icon, label) => 
  h('div.icon_button', {
    on: {click: e => window.open(url, target)}
  }, [
    h(`span.fas fa-${icon} fa-fw`),
    h('div.label', label)
  ])

export default (state, send) => h('div#top.panel', [
  h('h1', "Fantastic"),
  Search(state, send),
   h('div.buttons', [
    state.user ? h('div.user_info', [
      h('div.username', state.user.username),
      h('div.item', `Role: ${state.user.role}`)
    ]) : undefined,
    state.user && HasRole(state.user, 'admin') ? link('/logs.html', '_blank', 'bars', 'Logs') : undefined,
    link('/auth', '_self', 'user-circle', 'Account'),
    link('/logout', '_self', 'sign-out-alt', 'Log Out'),
    link('/help/index.md', '_blank', 'question-circle', 'Help')
  ])
])