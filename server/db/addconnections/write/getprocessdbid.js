/**
 * Get the database ID for a process, adding/updating the entry if required
 * @param {import('fantastic-utils/db/operations').Operations} db write transaction
 * @param {number} node_id database ID of the host owning the connection
 * @param {number} pid
 * @param {{}} process data about the process owning the connection
 * @param {string} process_name name of process owning the connection
 */
const getProcessID = async (db, node_id, pid, process, process_name) => {
  if (process) {
    if (process_name) await db.update({table: 'processes', row: {name: process_name}, conditions: {columns: {process_id: process.process_id}}}) // if we found a matching process, we should update the name in case the ID now corresponds to a different process
    return process.process_id
  } 
  else {
    return await db.insert('processes', {pid, name: process_name, node_id}) // if we didn't find a process, insert it
  }
}

module.exports = getProcessID