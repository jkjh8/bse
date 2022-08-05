import { ref, computed } from 'vue'
import { api } from '../useAxios'

const user = ref(null)

const nickName = computed(() => {
  if (user.value && user.value.name) {
    return user.value.name.substring(0, 1)
  } else {
    return 'No'
  }
})

function updateUser(args) {
  user.value = args
}
export { user, nickName, updateUser }
