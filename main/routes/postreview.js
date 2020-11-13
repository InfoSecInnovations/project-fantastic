const ParseQuery = require('@infosecinnovations/fantastic-utils/parsequery')
const Abort = require('./abort')
const { transaction } = require('../db')
const Auth = require('./auth')
const End = require('./end')

const postReview = (res, req) => {
  Abort(res)
  const query = ParseQuery(req.getQuery())
  console.log(`postReview: received http request to review ${query.test} results...`)
  Auth(req.getHeader('cookie'))
  .then(async user => {
    if (!user) return End(res)
    const db = await transaction()
    let test_id
    if (query.quest) {
      const quest_result = await db.get({      
        table: 'quest_history',
        columns: ['MAX(date) AS date', 'quest_id'], 
        conditions: {columns: {quest: query.test, user_id: user.user_id}},
        group_by: ['quest']
      })
      if (quest_result) test_id = (await db.get({
        table: 'test_history',
        columns: ['test_id'],
        conditions: {columns: {quest_id: quest_result.quest_id}}
      })).test_id
    }
    else {
      const test_result =  await db.get({      
        table: 'test_history',
        columns: ['MAX(date) AS date', 'test_id'], 
        conditions: {columns: {test: query.test, user_id: user.user_id}},
        group_by: ['test']
      })
      if (test_result) test_id = test_result.test_id
    }
    if (test_id) {
      const approved = query.approved === 'true' ? 1 : 0
      await db.insert('approval_history', {test_id, approved, user_id: user.user_id})
      await db.close()
      console.log(`postReview: updated approval status for ${query.test}.`)
      return res.end(JSON.stringify({approved}))
    }
    await db.close()
    console.log(`postReview: unable to update approval status for ${query.test}.`)
    return res.end(JSON.stringify({approved: false}))
  })
}

module.exports = postReview