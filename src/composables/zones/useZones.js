import { ref } from 'vue'
import { api } from 'src/composables/useAxios'

const zones = ref([])
async function getZones() {
  const r = await api.get('zones')
  zones.value = r.data
}

export { zones, getZones }
