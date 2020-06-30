const H = require('snabbdom/h').default
const Search = require('./search')
const HasRole = require('fantastic-utils/hasrole')

const link = (url, target, icon, label) => 
  H('div.icon_button', {
    on: {click: e => window.open(url, target)}
  }, [
    H(`span.fas fa-${icon} fa-fw`),
    H('div.label', label)
  ])

const top = (state, send) => H('div#top', [
  H('h1', "Fantastic"),
  Search(state, send),
  state.user ? H('div.buttons', [
    H('div.user_info', [
      H('div.username', state.user.username),
      H('div.item', `Role: ${state.user.role}`)
    ]),
    HasRole(state.user, 'admin') ? link('/logs.html', '_blank', 'bars', 'Logs') : undefined,
    link('/auth', '_self', 'user-circle', 'Account'),
    link('/logout', '_self', 'sign-out-alt', 'Log Out'),
    link('/help/index.md', '_blank', 'question-circle', 'Help')
  ]) : undefined
])

module.exports = top