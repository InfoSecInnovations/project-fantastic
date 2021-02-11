import UserHistory from './userhistory'

export default (state, send, quest, data) => {
  send({
    type: 'quest_results', 
    quest,
    results: data.result, 
    date: data.date, 
    select: true, 
    nodes: data.rows,
    scan_id: data.scan_id
  }),
  send({
    type: 'scan_results',
    results: data.result, 
    scan_id: data.scan_id, 
    date: data.date, 
    parameters: state.quests[quest].parameters, 
    scan: quest
  }) // quest results are the same as the scan run by the quest
  UserHistory(send)
  if (state.quests[quest].pass === 'review') send({type: 'review', results: data.result, data_key: quest, data_type: 'quests'})
}