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
    data.value = await window.parseInt.readData()
  })

  //今日的打卡总时长
  const today = computed(() => {
    const [y, m, d] = new Date().toLocaleDateString().split('/')
    return getDataByYMD(data.value, y, m, d)
  })
})
