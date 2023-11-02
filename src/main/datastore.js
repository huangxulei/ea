//辅佐方法
import { app } from 'electron'
import * as path from 'path'
import * as fs from 'fs'

const dir = app.getPath('userData')
const file = path.join(dir, 'my.json')

const defaultData = {
  rest: true,
  target: 120,
  record: {
    sum: 0,
    count: 0
  },
  alarm: {
    open: true,
    music: {
      working: 'alarm1',
      break: 'alarm2'
    }
  }
}

async function init() {
  if (!fs.existsSync(file)) {
    console.log('初始化完成')
    fs.mkdir(dir, () => {})
    write(defaultData)
  }
}

async function read() {
  await init()
  return require(file)
}

function write(data) {
  fs.writeFile(file, JSON.stringify(data), (err) => {
    if (err) {
      console.log(err)
    }
  })
}

export { read, write }
