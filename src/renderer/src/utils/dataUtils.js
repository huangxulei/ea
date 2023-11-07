//增加对应年月日的记录, record: [分钟数， 开始时间， 结束时间]
function setRecord(data, y, m, d, record) {
  let curr = data.record;
  curr.sum += record[0];
  curr.count++;
  if (curr[y] === undefined) {
    curr[y] = {sum: 0, count: 0};
  }
  curr = curr[y];
  curr.sum += record[0];
  curr.count++;
  if (curr[m] === undefined) {
    curr[m] = {sum: 0, count: 0};
  }
  curr = curr[m];
  curr.sum += record[0];
  curr.count++;

  if (curr[d] === undefined) {
    curr[d] = {sum: 0, count: 0, data: []};
  }
  curr = curr[d];
  curr.sum += record[0];
  curr.count ++;
  curr.data.push(record);
}