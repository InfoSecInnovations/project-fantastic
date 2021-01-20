import UserHistory from './userhistory'

export default (state, send, test, parameters, data) => {
  send({
    type: 'test_results', 
    test,
    results: data.result, 
    test_id: data.test_id, 
    date: data.date, 
    select: true, 
    parameters
  })
  UserHistory(send)
  if (state.tests[test].pass === 'review') send({type: 'review', results: data.result, data_key: test, data_type: 'tests'})
}