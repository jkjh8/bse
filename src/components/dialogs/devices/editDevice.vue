<script setup>
import { reactive, onMounted } from 'vue'
import { api } from 'src/composables/useAxios'
import { useQuasar, useDialogPluginComponent } from 'quasar'
import useNotify from 'src/composables/useNotify'
import {
  required,
  minNumber,
  checkIpaddressType
} from 'src/composables/useRules'

const emit = defineEmits([...useDialogPluginComponent.emits])
const props = defineProps({ item: Object })
const { dialogRef, onDialogOK, onDialogCancel } = useDialogPluginComponent()

const device = reactive({
  _id: null,
  index: null,
  ipaddress: null,
  name: '',
  deviceType: '',
  mode: '',
  model: ''
})

async function checkDeviceIndex(v) {
  const r = await api.get(
    `/device/idxexists/${encodeURIComponent(
      JSON.stringify({ index: v, id: device._id })
    )}`
  )
  if (r && r.data.result) return '이미 사용중인 인덱스 입니다.'
  return true
}

async function checkIpaddressExists(v) {
  const r = await api.get(
    `/device/ipexists/${encodeURIComponent(
      JSON.stringify({ ipaddress: v, id: device._id })
    )}`
  )
  if (r && r.data.result) return '이미 사용중인 아이피 주소 입니다.'
  return true
}

onMounted(() => {
  if (props.item) {
    ;(device._id = props.item._id),
      (device.index = props.item.index),
      (device.name = props.item.name),
      (device.ipaddress = props.item.ipaddress),
      (device.deviceType = props.item.deviceType),
      (device.mode = props.item.mode),
      (device.model = props.item.model)
  }
})

function onSubmit() {
  onDialogOK(device)
}
</script>

<template>
  <q-dialog ref="dialogRef" persistent>
    <q-card class="q-dialog-plugin body-font" style="width: 360px">
      <q-card-section class="row no-wrap q-gutter-sm">
        <q-icon
          style="margin-top: 10px"
          name="svguse:icons.svg#serverColorPlus"
          size="1.5rem"
        />
        <div class="name">디바이스 수정</div>
      </q-card-section>
      <q-form @submit="onSubmit">
        <q-card-section>
          <div>
            <q-input
              v-model="device.index"
              filled
              dense
              label="ID"
              type="number"
              lazy-rules
              :rules="[required, minNumber, checkDeviceIndex]"
            />

            <q-input
              v-model="device.name"
              dense
              filled
              label="Name"
              lazy-rules
              :rules="[required]"
            />

            <q-select
              v-model="device.deviceType"
              dense
              filled
              label="Device Type"
              :options="['Q-Sys', 'Barix']"
              lazy-rules
              :rules="[required]"
            />

            <!-- device type === barix -->
            <q-select
              v-if="device.deviceType === 'Barix'"
              v-model="device.mode"
              dense
              filled
              label="Mode"
              :options="['Send', 'Receive']"
              lazy-rules
              :rules="[required]"
            />

            <!-- device type === qsys -->
            <q-select
              v-if="device.deviceType === 'Q-Sys'"
              v-model="device.mode"
              dense
              filled
              label="Mode"
              :options="['Core', 'Local']"
              lazy-rules
              :rules="[required]"
            />

            <q-select
              v-if="device.deviceType === 'Q-Sys' && device.mode !== 'Local'"
              v-model="device.model"
              dense
              filled
              label="Device Model"
              :options="['110f', '510i']"
              lazy-rules
              :rules="[required]"
            />

            <!-- ipaddress -->
            <q-input
              v-if="device.mode !== 'Local'"
              v-model="device.ipaddress"
              dense
              filled
              label="IP Address"
              lazy-rules
              :rules="[required, checkIpaddressType, checkIpaddressExists]"
            />
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            class="btn"
            flat
            color="red-10"
            label="취소"
            @click="onDialogCancel"
          ></q-btn>
          <q-btn
            class="btn"
            unelevated
            color="primary"
            label="확인"
            type="submit"
          ></q-btn>
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<style scoped>
.btn {
  width: 4rem;
}
</style>
