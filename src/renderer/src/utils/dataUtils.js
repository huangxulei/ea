function setRecord(data, y, m, d, record) {
  let curr = data.record
  curr.sum += record[0]
  curr.count++
  if (curr[y] == undefined) {
    curr[y] = { sum: 0, count: 0 }
  }
  curr = curr[y]
  curr.sum += record[0]
  curr.count++
  if (curr[m] === undefined) {
    curr[m] = { sum: 0, count: 0 }
  }
}
