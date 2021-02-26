const getScanItem = (stories, item) => {
  if (item.event_type == 'quest') return {...item, event_type: 'scan', scan: item.quest}
  if (item.event_type == 'story') return {...item, event_type: 'scan', scan: stories[item.story].nodeData[item.story_node_id].key}
  return item
}

const compareEvent = (stories, a, b) => {
  if (!a || !b) return false
  const itemA = getScanItem(stories, a)
  const itemB = getScanItem(stories, b)
  if (itemA.event_type != itemB.event_type) return false
  if (itemA.event_type == 'quest') return itemA.quest === itemB.quest
  if (itemA.event_type == 'scan') {
    if (itemA.scan !== itemB.scan) return false
    const a_parameters = itemA.parameters && JSON.parse(itemA.parameters)
    const b_parameters = itemB.parameters && JSON.parse(itemB.parameters)
    return a_parameters == b_parameters || (typeof a_parameters == 'object' && typeof b_parameters == 'object' && Object.entries(a_parameters).every(v => b_parameters[v[0]] === v[1]))
  }
  if (itemA.event_type == 'command') return itemA.command === itemB.command && itemA.status === itemB.status
  if (itemA.event_type == 'story') {
    if (itemA.story != itemB.story) return false
    return (itemA.story_node_id == itemB.story_node_id)
  }
  return false
}

module.exports = compareEvent