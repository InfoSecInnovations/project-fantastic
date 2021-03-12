import UserHistory from './userhistory'

export default (state, send, scan, parameters, data) => {
  send({
    type: 'scan_results', 
    scan,
    results: data.result, 
    scan_id: data.scan_id,
    history_item: data.history_item, 
    date: data.date, 
    select: true, 
    parameters,
    age: data.age
  })
  UserHistory(send)
  if (state.scans[scan].pass === 'review') send({type: 'review', results: data.result, data_key: scan, data_type: 'scans'})
}