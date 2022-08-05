import { ref, computed } from 'vue'
import { api } from '../useAxios'

const devices = ref([])
const status = ref(null)

const sender = computed(() => {
  const r = []
  devices.value.forEach((d) => {
    if (d.mode === 'Core' || d.mode === 'Send') {
      r.push(d)
    }
  })
  return r
})

const receiver = computed(() => {
  const r = []
  devices.value.forEach((d) => {
    if (d.mode === 'Receive') {
      r.push(d)
    }
  })
  return r
})

async function getDevices() {
  try {
    const r = await api.get('/device')
    devices.value = r.data
  } catch (err) {
    console.error('디바이스 정보 갱신 오류', err)
  }
}

async function getStatus() {
  try {
    const r = await api.get('/device/status')
    status.value = r.data
  } catch (err) {
    console.error('디바이스 상태 갱신 오류', err)
  }
}

export { devices, status, sender, getDevices, getStatus }
