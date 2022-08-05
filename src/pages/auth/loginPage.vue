<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { LocalStorage as Local, useQuasar } from 'quasar'
import { required, checkTypeEmail, minLength } from 'src/composables/useRules'
import useNotify from 'src/composables/useNotify'
import { updateUser } from 'src/composables/users/useUser'

const $q = useQuasar()
const $r = useRouter()
const $n = useNotify()

const userInfo = reactive({
  email: '',
  password: '',
  saveEmail: false
})

const showPassword = ref(false)

function checkSavedEmail() {
  if (Local.has('email')) {
    userInfo.saveEmail = true
    userInfo.email = Local.getItem('email')
  }
}

function saveEmail() {
  if (userInfo.saveEmail) {
    Local.set('email', userInfo.email)
  } else {
    Local.remove('email')
  }
}

async function onSubmit() {
  try {
    $q.loading.show()
    saveEmail()
    const r = await API.send('user:login', {
      email: userInfo.email,
      password: userInfo.password
    })

    if (r.result) {
      updateUser(JSON.parse(r.data))
      $r.push('/')
    } else {
      $n.warn(r.data)
    }
    $q.loading.hide()
  } catch (err) {
    $q.loading.hide()
    console.error('User Login error: ', err)
  }
}

onMounted(() => {
  checkSavedEmail()
})
</script>

<template>
  <div class="center q-gutter-y-sm">
    <div class="text-grey-6" style="text-align: center">
      이메일로 로그인하기
    </div>
    <q-separator />
    <q-form @submit="onSubmit" class="q-pt-sm">
      <q-input
        v-model="userInfo.email"
        dense
        outlined
        label="이메일 주소"
        :rules="[required, checkTypeEmail]"
        lazy-rules
      />
      <q-input
        v-model="userInfo.password"
        dense
        outlined
        label="비밀번호"
        :type="showPassword ? 'text' : 'password'"
        :rules="[required, minLength]"
        lazy-rules
      >
        <template #append>
          <q-icon
            class="pointer"
            :name="showPassword ? 'visibility' : 'visibility_off'"
            @click="showPassword = !showPassword"
          />
        </template>
      </q-input>
      <q-btn class="full-width" unelevated color="primary" type="submit">
        로그인하기
      </q-btn>
      <div class="row justify-end">
        <q-checkbox
          v-model="userInfo.saveEmail"
          label="이메일 저장하기"
          left-label
        />
      </div>
    </q-form>
    <q-separator />
    <div class="row justify-center">
      <router-link to="/auth/register">계정이 없나요?</router-link>
    </div>
  </div>
</template>

<style scoped>
.center {
  position: absolute;
  min-width: 300px;
  left: 50%;
  top: 25%;
  transform: translateX(-50%);
}
</style>
