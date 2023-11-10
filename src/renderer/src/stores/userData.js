import { defineStore } from 'pinia'
import { ref, onMounted, computed } from 'vue'
import { setRecord, getDataByYMD } from '../utils/dataUtils'

export const useUserData = defineStore('userData', () => {
  const data = ref({
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
  })

  onMounted(async () => {
    data.value = await window.api.readData()
  })

  //今日的打卡总时长
  const today = computed(() => {
    const [y, m, d] = new Date().toLocaleDateString().split('/')
    return getDataByYMD(data.value, y, m, d)
  })

  //过去一个月的打卡数据
  const lastMonth = computed(() => {
    const date = new Date()
    const res = []
    for (let i = 0; i < 31; i++) {
      const [y, m, d] = date.toLocaleDateString().split('/')
      res.push(getDataByYMD(data.value, y, m, d))
      date.setDate(date.getDate() - 1)
    }
    res.reverse()
    return res
  })

  function save() {
    window.api.writeData(JSON.parse(JSON.stringify(data.value)))
  }

  function setNewRecord(record) {
    const [y, m, d] = new Date().toLocaleDateString().split('/')
    setRecord(data.value, y, m, d, record)
  }

  return { data, save, setNewRecord, lastMonth, today }
})
