import UserHistory from './userhistory'

export default (state, send, quest, data) => {
  send({
    type: 'quest_results', 
    quest,
    results: data.result, 
    date: data.date, 
    select: true, 
    nodes: data.rows,
    test_id: data.test_id
  }),
  send({
    type: 'test_results',
    results: data.result, 
    test_id: data.test_id, 
    date: data.date, 
    parameters: state.quests[quest].parameters, 
    test: quest
  }) // quest results are the same as the test run by the quest
  UserHistory(send)
  if (state.quests[quest].pass === 'review') send({type: 'review', results: data.result, data_key: quest, data_type: 'quests'})
}