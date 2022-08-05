<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { user } from 'src/composables/users/useUser'

const $r = useRouter()

onMounted(() => {
  if (!user.value) {
    $r.push('/auth/login')
  }
})
</script>

<template>
  <q-page class="flex flex-center">
    <q-img src="logo.png" style="width: 200px; height: 200px" />
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage'
})
</script>
