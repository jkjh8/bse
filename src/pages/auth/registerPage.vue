<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { api } from 'src/composables/useAxios'
import useNotify from 'src/composables/useNotify'
import { required, checkTypeEmail, minLength } from 'src/composables/useRules'

const $q = useQuasar()
const $r = useRouter()
const $n = useNotify()

const userInfo = reactive({
  name: '',
  email: '',
  password: '',
  chkPassword: '',
  saveEmail: false
})

const showPassword = ref(false)
const showChkPassword = ref(false)

async function checkEmailUsed(v) {
  const r = await API.send('user:checkEmail', v)
  if (r) {
    return '이미 사용중인 이메일 입니다.'
  }
  return true
}

async function onSubmit() {
  try {
    $q.loading.show()
    const r = await API.send('user:register', {
      name: userInfo.name,
      email: userInfo.email,
      password: userInfo.password
    })
    if (r.result) {
      return $n.warn(r.error)
    }

    $n.info('회원 가입 완료', '로그인을 위해서 로그인 페이지로 이동합니다.')
    $r.push('/auth/login')
    $q.loading.hide()
  } catch (err) {
    $q.loading.hide()
    console.error('User Register Error: ', err)
  }
}
</script>

<template>
  <div class="center q-gutter-y-sm">
    <div class="text-grey-6" style="text-align: center">이메일로 가입하기</div>
    <q-separator />
    <q-form @submit="onSubmit" class="q-pt-sm">
      <div>
        <q-input
          v-model="userInfo.name"
          dense
          outlined
          label="이름"
          :rules="[required]"
          lazy-rules
        />
        <q-input
          v-model="userInfo.email"
          dense
          outlined
          label="이메일 주소"
          :rules="[required, checkTypeEmail, checkEmailUsed]"
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
        <q-input
          v-model="userInfo.chkPassword"
          dense
          outlined
          label="비밀번호 확인"
          :type="showChkPassword ? 'text' : 'password'"
          :rules="[
            required,
            minLength,
            (v) => v === userInfo.password || '비밀번호가 일치 하지 않습니다.'
          ]"
          lazy-rules
        >
          <template #append>
            <q-icon
              class="pointer"
              :name="showChkPassword ? 'visibility' : 'visibility_off'"
              @click="showChkPassword = !showChkPassword"
            />
          </template>
        </q-input>
        <q-btn class="full-width" unelevated color="primary" type="submit">
          가입하기
        </q-btn>
      </div>
    </q-form>
    <q-separator />
    <div class="row justify-center">
      <router-link to="/">홈으로</router-link>
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
