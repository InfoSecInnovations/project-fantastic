import UserHistory from './userhistory'

export default (state, send, scan, parameters, data) => {
  send({
    type: 'scan_results', 
    scan,
    results: data.result, 
    scan_id: data.scan_id, 
    date: data.date, 
    select: true, 
    parameters
  })
  UserHistory(send)
  if (state.scans[scan].pass === 'review') send({type: 'review', results: data.result, data_key: scan, data_type: 'scans'})
}