<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useQuasar, useDialogPluginComponent } from 'quasar'
import useNotify from 'src/composables/useNotify'
import { api } from 'src/composables/useAxios'
import { required, minNumber } from 'src/composables/useRules'
import { sender } from 'src/composables/zones/useDevices'

const props = defineProps({ item: Object })
const emits = defineEmits([...useDialogPluginComponent.emits])
const { dialogRef, onDialogOK, onDialogCancel } = useDialogPluginComponent()

const $q = useQuasar()
const $n = useNotify()

const options = ref(sender.value)

const zone = reactive({
  _id: null,
  index: null,
  core: null,
  name: '',
  channels: 0,
  children: []
})

function fnFilter(val, update) {
  if (!val) {
    update(() => {
      options.value = sender.value
    })
  } else {
    update(() => {
      options.value = sender.value.filter((v) => v.name.indexOf(val) > -1)
    })
  }
}
function updateCore(core) {
  console.log(core)
  try {
    switch (core.model) {
      case '110f':
        zone.channels = 4
        break
      case '510i':
        zone.channels = 32
        break
      default:
        zone.channels = 16
        break
    }
  } catch (err) {
    console.error(err)
  }
}

async function checkZoneIndex(v) {
  try {
    const r = await api.get(
      `/zones/idxexists/${encodeURIComponent(
        JSON.stringify({ index: v, id: zone._id })
      )}`
    )
    if (r && r.data.result) return '이미 사용중인 인덱스 입니다.'
    return true
  } catch (err) {
    console.error('방송구간 인덱스 확인 중 오류', err)
    return '중복 확인 중 오류가 발생하였습니다.'
  }
}

async function checkUsedCore(v) {
  try {
    const r = await api.get(
      `/zones/coreexists/${encodeURIComponent(
        JSON.stringify({ coreId: v._id, zoneId: zone._id })
      )}`
    )
    console.log(r)
    if (r && r.data.result) return '이미 다른지역에 사용중인 코어 입니다.'
    return true
  } catch (err) {
    console.error('방송 구간 코어 중복 확인 오류', err)
    return '중복 확인 중 오류가 발생하였습니다.'
  }
}

onMounted(() => {
  if (props.item) {
    ;(zone._id = props.item._id),
      (zone.index = props.item.index),
      (zone.name = props.item.name),
      (zone.core = props.item.core),
      (zone.channels = props.item.channels),
      (zone.children = props.item.children)
  }
})
</script>

<template>
  <q-dialog ref="dialogRef" persistent>
    <q-card class="q-dialog-plugin">
      <q-form @submit="onDialogOK(zone)">
        <q-card-section>
          <q-item>
            <q-item-section avatar>
              <q-icon name="svguse:icons.svg#serverColorPlus" />
            </q-item-section>

            <q-item-section>
              <q-item-label> 방송구간 추가 </q-item-label>
              <q-item-label caption> 지역단위 방송구간 추가 </q-item-label>
            </q-item-section>
          </q-item>
        </q-card-section>

        <q-card-section>
          <div>
            <q-input
              v-model="zone.index"
              dense
              filled
              label="ID"
              type="number"
              lazy-rules
              :rules="[required, minNumber, checkZoneIndex]"
            />

            <q-input
              v-model="zone.name"
              dense
              filled
              label="Name"
              lazy-rules
              :rules="[required]"
            />

            <!-- select core -->
            <q-select
              v-model="zone.core"
              :options="options"
              dense
              filled
              use-input
              label="Core"
              option-label="name"
              lazy-rules
              :rules="[required, checkUsedCore]"
              @filter="fnFilter"
              @update:model-value="updateCore(zone.core)"
            >
              <template #option="scope">
                <q-item v-bind="scope.itemProps">
                  <q-item-section avatar>
                    {{ scope.opt.deviceType }}
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ scope.opt.name }}</q-item-label>
                    <q-item-label caption> </q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </q-select>

            <q-input
              v-model="zone.channels"
              dense
              filled
              label="channels"
              type="number"
              lazy-rules
              :rules="[required, minNumber]"
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

<style scoped></style>
